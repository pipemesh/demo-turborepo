import { test } from "node:test";
import assert from "node:assert/strict";
import { sent } from "./lib.ts";
test("sent", () => assert.ok(sent().length > 0));
