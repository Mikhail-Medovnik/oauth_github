import { createServer } from "./createServer";

async function startServer() {
  const server = await createServer();

  await server.listen({
    port: 5173,
    host: "localhost",
  });

  console.log(`App is running on http://localhost:5173`);
}

(async () => {
  await startServer();
})();
