import { FastifyInstance } from "fastify";
import Cors from "@fastify/cors";

const corsOptions = {
  origin: "http://localhost:5173",
};

export function registerCorsProvider(app: FastifyInstance) {
  app.register(Cors, corsOptions);
}
