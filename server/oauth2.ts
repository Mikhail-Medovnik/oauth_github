import {
  FastifyInstance,
  FastifyRequest,
  FastifyRegisterOptions,
} from "fastify";
import fastifyOauth2, {
  FastifyOAuth2Options,
  OAuth2Namespace,
} from "@fastify/oauth2";

declare module "fastify" {
  interface FastifyInstance {
    githubOAuth2: OAuth2Namespace;
  }
}

const githubOAuth2Options: FastifyRegisterOptions<FastifyOAuth2Options> = {
  name: "githubOAuth2",
  scope: [],

  credentials: {
    client: {
      id: "Iv1.a9bd9a15458e6839",
      secret: "8dbe169562b4094ba364cd52ca278fdd3c32c4b4",
    },
    auth: fastifyOauth2.GITHUB_CONFIGURATION,
  },

  startRedirectPath: "/login/github",

  callbackUri: `http://localhost:5173/login/github/callback`,

  generateStateFunction: (request: FastifyRequest) => {
    // @ts-ignore
    return request.query.state;
  },

  // @ts-ignore
  checkStateFunction: (returnedState, callback) => {
    // @ts-ignore
    if (returnedState.query.state) {
      callback();
      return;
    }
    callback(new Error("Invalid state"));
  },
};

export function registerGithubOAuth2Provider(app: FastifyInstance) {
  app.register(fastifyOauth2, githubOAuth2Options);
}
