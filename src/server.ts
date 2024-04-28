import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyHtml from "fastify-html";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import helmet from "@fastify/helmet";
import { getLogger } from "./logger.js";
import { env } from "./env.js";
import { fastifyCookie } from "@fastify/cookie";
import randomstring from "randomstring";
import fastifySession from "@fastify/session";
import { calculateTtl, getGithubToken } from "./utils";
import { GithubTokenData } from "./utils/get-github-token.js";
import { getGithubUserData } from "./utils";

interface SessionData {
  authenticated?: boolean;
  lastLoginTime?: number;
  githubToken?: GithubTokenData | null;
}

const server = fastify({
  logger: getLogger(),
  ignoreDuplicateSlashes: true,
  ignoreTrailingSlash: true,
});

server.register(fastifyCookie);
server.register(fastifySession, {
  secret: randomstring.generate({
    length: 32,
    charset: "alphabetic",
    readable: false,
  }),
  cookie: { maxAge: calculateTtl(15), secure: false },
});

server.register(helmet);
server.register(formBody);
server.register(fastifyHtml);

if (env.CORS !== "") {
  server.register(cors, { origin: env.CORS.split(",") });
}

server.addHook("onRequest", async (req: FastifyRequest, res: FastifyReply) => {
  const session: SessionData = req.session as SessionData;
  if (session.authenticated) {
    const currentTime = new Date().getTime();
    const lastLoginTime = session.lastLoginTime || currentTime;
    const fifteenDaysInMilliseconds = calculateTtl(15); // 15 days in milliseconds
    if (currentTime - lastLoginTime > fifteenDaysInMilliseconds) {
      // User's session has expired, log them out
      session.authenticated = false;
      session.lastLoginTime = undefined;
    } else {
      // Update last login time
      session.lastLoginTime = currentTime;
    }
  }
});

server.get("/", async (req, res) => {
  const session = req.session as SessionData;
  return session.authenticated
    ? res.html`Hello Man`
    : res.html`<a href="http://localhost:3000/authorize">Login with GitHub</a>`;
});

server.get("/authorize", async (req, res) => {
  return res.redirect(`${env.GITHUB_AUTH_LINK}${env.CLIENT_ID}`);
});

const oauthReqSchema = {
  schema: {
    querystring: {
      properties: {
        code: { type: "string" },
      },
      required: ["code"],
    },
  },
};

server.get("/oauth", oauthReqSchema, async (req, res) => {
  const query = req.query as { code: string };
  const session = req.session as SessionData;
  const { code } = query;
  session.authenticated = true;
  session.lastLoginTime = new Date().getTime();
  session.githubToken = await getGithubToken(code);

  const a = await getGithubUserData(session.githubToken?.access_token || "");
  console.log(a);

  return { message: session.githubToken, session };
});

server.get("/api/healthcheck", async () => {
  return { message: "ok" };
});

export { server };
