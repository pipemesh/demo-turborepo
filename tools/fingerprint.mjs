#!/usr/bin/env node
// Writes one file per deployable service into argv[2] (default:
// fingerprints/): a digest of Turborepo's hash for the service's build
// task. That hash covers the service's files, the build tasks of every
// workspace package it depends on (so their files too), the external
// dependencies it resolves from the lockfile, the root's dependencies and
// the task's definition — so a service's file changes exactly when a
// change can change what it builds or tests, and a README, a sibling's
// code or a formatting edit to turbo.json leave it alone.
//
// Every service's file also covers what the task hash cannot see: the
// service pipeline's config (its image and steps) and the deploy scripts,
// so a change to how services ship reaches them too.
//
// The dispatch pipeline produces these files as entries and dispatches a
// service when its entry changed since that service's last dispatch.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";

const out = process.argv[2] ?? "fingerprints";
const run = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8", maxBuffer: 64 << 20 });
const sha256 = (s) => createHash("sha256").update(s).digest("hex");

const dry = JSON.parse(run("pnpm", ["-s", "turbo", "run", "build", "--dry=json"]));
const shipping = sha256(run("git", ["ls-files", "-s", "--", ".pipemesh/service.yaml", "deploy"]));

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const task of dry.tasks) {
  // Deployable services live under services/; libraries are reached
  // through the services that depend on them.
  if (!task.directory.startsWith("services/")) continue;
  const svc = task.package;
  const digest = sha256(`${task.taskId} ${task.hash}\nshipping ${shipping}\n`);
  writeFileSync(`${out}/${svc}`, digest + "\n");
  console.log(`${svc} ${digest.slice(0, 12)}`);
}
