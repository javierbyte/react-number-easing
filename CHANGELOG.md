# 1.1.0

- Add a Next.js-compatible client boundary while preserving SSR output.
- Add generated TypeScript declarations and export the props and easing types.
- Support React and React DOM 17, 18, and 19.
- Add compatibility, hydration, type-resolution, package, and Next.js build tests.
- Replace the legacy ESLint configuration with a flat TypeScript configuration.
- Render the `customFunctionRender` result directly instead of wrapping it in
  an array, so element renderers no longer trigger React's missing-key
  warning.
- Ship only the entry points and docs on npm. The published tarball drops the
  demo website, tooling config, and README assets, going from 22 files and
  1.19 MB in 1.0.2 to 6 files and 11 KB.
- Keep the v1 interval scheduler and historical package entry paths unchanged.
- Note: npm 1.0.2 did not include the declarations that were present in the
  repository.

# 1.0.2

- Remove direct import of `React`

# 1.0.1

- Add github repo.

# 1.0.0

- Updated to React 17.
- Renders to a `React.Fragment` now. Does not create an additional div.
- Support for custom renders.
- `useLocaleString` deprecated.

# 0.0.4

Fix incorrect numbers being drawn when the screen was inactive. (thanks! @migreva)

# 0.0.3

Added `delayValue` prop to delay the start of the animation.

# 0.0.2

Added `userLocaleString` prop. Thanks @adjohu.

#0.0.1 Initial release
