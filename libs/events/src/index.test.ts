import { test } from "node:test";
import assert from "node:assert/strict";
import { describe, event } from "./index.ts";
test("describes an event", () => assert.equal(describe(event("paid", { id: 1 })), 'paid {"id":1}'));
