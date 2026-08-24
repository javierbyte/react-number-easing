# react-number-easing website

The demo site for [react-number-easing](https://javier.xyz/react-number-easing),
built with Next.js and JBX.

```sh
pnpm install
pnpm dev
```

Then open http://localhost:3007/react-number-easing.

`pnpm build` writes a fully static export to `out/`. The `Deploy` workflow in
`.github/workflows/deploy.yml` builds it on every push to `main` and pushes the
result to the `gh-pages` branch, which `javier.xyz/react-number-easing` serves
through a vercel rewrite to `javierbyte.github.io/react-number-easing`.

The site is served under the `/react-number-easing` base path, defined once in
[`src/lib/basePath.js`](src/lib/basePath.js).
