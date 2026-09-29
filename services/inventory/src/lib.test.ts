import { test } from "node:test";
import assert from "node:assert/strict";
import { reserved } from "./lib.ts";
test("reserved", () => assert.ok(reserved().length > 0));
