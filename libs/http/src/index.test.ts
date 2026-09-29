import { test } from "node:test";
import assert from "node:assert/strict";
import { serve } from "./index.ts";
test("serves JSON", async () => {
  process.env.PORT = "0";
  const s = serve("t", () => ({ ok: true }));
  await new Promise((r) => s.once("listening", r));
  const { port } = s.address() as { port: number };
  const body = await (await fetch(`http://127.0.0.1:${port}`)).json();
  s.close();
  assert.deepEqual(body, { service: "t", ok: true });
});
