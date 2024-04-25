import fastify from "fastify";
import fastifyHtml from "fastify-html";
import cors from "@fastify/cors";
import formBody from "@fastify/formbody";
import helmet from "@fastify/helmet";
import axios from "axios";
import { getLogger } from "./logger.js";
import { env } from "./env.js";
import { getGithubToken } from "./utils/get-github-token.js";

const server = fastify({
  logger: getLogger(),
  ignoreDuplicateSlashes: true,
  ignoreTrailingSlash: true,
});

server.register(helmet);
server.register(formBody);
server.register(fastifyHtml);

if (env.CORS !== "") {
  server.register(cors, { origin: env.CORS.split(",") });
}
server.get("/", async (req, res) => {
  return res.html`<a href="http://localhost:3000/authorize">Login with GitHub</a>`;
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

interface GithubTokenData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: "bearer";
  scope: "";
}

server.get("/oauth", oauthReqSchema, async (req, res) => {
  const query = req.query as { code: string };
  const { code } = query;

  const tokenData = await getGithubToken(code);

  return { message: tokenData };
});

server.get("/api/healthcheck", async () => {
  return { message: "ok" };
});

export { server };
