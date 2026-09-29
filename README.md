# demo-turborepo

A Turborepo monorepo on PipeMesh: five services, three shared libraries,
and a dispatch pipeline that sends each revision only to the services the
change can affect.

```
libs/money   ─┬─ orders    payments   catalog
libs/events  ─┼─ orders    inventory  notifications
libs/http    ─┴─ every service
```

- `pipemesh.yaml` — the dispatch pipeline: a `graph` job fingerprints
  every service, and one `delegate: pipeline` job per service consumes
  its fingerprint and dispatches when it changed (`consumed: changed`).
- `.pipemesh/service.yaml` — each service's own pipeline: build + test
  with Turborepo (the service and the packages it depends on), then
  staging and production, which deploy only a bundle that is new to them
  (`consumed: changed` again).
- `turbo/fingerprint@1` (a PipeMesh component) — one file per service from
  Turborepo's task hashes (`turbo run build --dry=json`): it changes
  exactly when a change can change the service.
- `vercel/turborepo-token@1` + `turbo/remote-cache@1` — each service
  build reads and writes Vercel's Remote Cache with no stored key: the
  job's PipeMesh identity is exchanged for a short-lived Turborepo token,
  and turbo is pointed at the cache with it.
- `.pipemesh/checks.yaml` — pull requests build and test only what
  `turbo run --affected` selects against the merge base.

Try it: change `libs/money` and only orders, payments and catalog receive
the revision; change a README and nothing does; change only an orders test
and orders builds and tests, then skips both deploys (identical bundle).

Each service pipeline lives under the dispatch pipeline on PipeMesh:
`/github.com/pipemesh/demo-turborepo/-/pipeline/<service>`.

The same shape on Bazel: [pipemesh/demo-bazel](https://github.com/pipemesh/demo-bazel).

Measured on pipemesh.dev: see the numbers in the commit history of this repository.
