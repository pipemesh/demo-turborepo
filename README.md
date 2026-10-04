# demo-turborepo

A Turborepo monorepo on Pipemesh: five services, three shared libraries,
and a dispatch pipeline that sends each revision only to the services the
change can affect.

```
libs/money   ─┬─ orders    payments   catalog
libs/events  ─┼─ orders    inventory  notifications
libs/http    ─┴─ every service
```

- `pipemesh.yaml` — the dispatch pipeline: a `graph` build fingerprints
  every service, and one `job_type: pipeline` job per service consumes its
  fingerprint and hands the revision over when it changed (it checks out
  nothing: the entry is its only input).
- `.pipemesh/service.yaml` — each service's own pipeline: a `job_type: build`
  that builds and tests with Turborepo (the service and the packages it
  depends on, from the whole workspace), then staging and production, two
  `job_type: deploy` jobs that ship only a bundle that is new to them, or a
  changed deploy script (`checkout: [deploy]`).
- `turbo/fingerprint@1` (a Pipemesh component) — one file per service from
  Turborepo's task hashes (`turbo run build --dry=json`): it changes
  exactly when a change can change the service.
- `vercel/turborepo-token@1` + `turbo/remote-cache@1` — each service
  build reads and writes Vercel's Remote Cache with no stored key: the
  job's Pipemesh identity is exchanged for a short-lived Turborepo token,
  and turbo is pointed at the cache with it.
- `.pipemesh/checks.yaml` — pull requests build and test only what
  `turbo run --affected` selects against the merge base (a `job_type: task`:
  it reads the pull request, so it runs on every one).

Try it: change `libs/money` and only orders, payments and catalog receive
the revision; change a README and nothing does; change only an orders test
and orders builds and tests, then skips both deploys (identical bundle).

Each service pipeline lives under the dispatch pipeline on Pipemesh:
`/github.com/pipemesh/demo-turborepo/-/pipeline/<service>`.

The same shape on Bazel: [pipemesh/demo-bazel](https://github.com/pipemesh/demo-bazel).

Measured on pipemesh.dev: see the numbers in the commit history of this repository.
