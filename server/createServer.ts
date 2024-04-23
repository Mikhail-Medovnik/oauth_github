import fastify from "fastify";

import { registerCorsProvider } from "./cors";
import { registerGithubOAuth2Provider } from "./oauth2";
import { githubOAuth2Routes } from "./github.route";

export async function createServer() {
  const app = fastify();

  registerCorsProvider(app);

  registerGithubOAuth2Provider(app);
  app.register(githubOAuth2Routes, { prefix: "/oauth2" });

  return app;
}
