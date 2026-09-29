import { createServer, type Server } from "node:http";
/** A one-route JSON service on $PORT (default 8080). */
export function serve(name: string, body: () => unknown): Server {
  const server = createServer((_req, res) => {
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ service: name, ...(body() as object) }));
  });
  return server.listen(Number(process.env.PORT ?? 8080));
}
