import { test } from "node:test";
import assert from "node:assert/strict";
import { captured } from "./lib.ts";
test("captured", () => assert.ok(captured().length > 0));
