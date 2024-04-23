import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";

export function githubOAuth2Routes(
  app: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void
) {
  app.get(
    "/github/callback",
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { token } =
        await app.githubOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);
      // Redirect to our frontend side
      // You can get the access token from the URI Query and save it as a cookie in the client browser
      reply.redirect(
        "http://localhost:5173/?access_token=" + token.access_token
      );
    }
  );

  done();
}
