# [React Number Easing](https://javier.xyz/react-number-easing)

React component for animated number transitions. It supports React 17, 18, and
19, TypeScript, server rendering, and the Next.js App Router.

[![npm version](https://img.shields.io/npm/v/react-number-easing.svg)](https://www.npmjs.com/package/react-number-easing)
[![npm downloads](https://img.shields.io/npm/dw/react-number-easing.svg)](https://www.npmjs.com/package/react-number-easing)
[![gzipped size](https://deno.bundlejs.com/badge?q=react-number-easing)](https://bundlejs.com/?q=react-number-easing)
[![license](https://img.shields.io/npm/l/react-number-easing.svg)](LICENSE)

[› Online demo](https://javier.xyz/react-number-easing)

[![react-number-easing screenshot](https://raw.githubusercontent.com/javierbyte/react-number-easing/main/assets/number-easing-infinite.gif)](https://javier.xyz/react-number-easing)

## Installation

```sh
pnpm add react-number-easing
```

The package also works with npm, Yarn, and Bun.

## Usage

```jsx
import NumberEasing from 'react-number-easing';

export default function Total({ value }) {
  return (
    <NumberEasing
      value={value}
      speed={300}
      decimals={0}
      ease="quintInOut"
    />
  );
}
```

The initial render displays the target value. Later `value` changes animate
from the currently rendered value to the new target.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | required | Target value displayed at the end of the animation. |
| `speed` | `number` | `500` | Animation duration in milliseconds. |
| `ease` | `EaseName` | `'quintInOut'` | Easing equation from [`eases`](https://github.com/mattdesl/eases). |
| `decimals` | `number` | `0` | Decimal places passed to `Number(value).toFixed(decimals)`. |
| `customFunctionRender` | `(value, decimals) => ReactNode` | default formatter | Replaces the default text formatter. |

All easing names and the component props are exported as TypeScript types:

```tsx
import NumberEasing, {
  type EaseName,
  type NumberEasingProps,
} from 'react-number-easing';

const ease: EaseName = 'cubicOut';

const props: NumberEasingProps = {
  value: 1200,
  decimals: 2,
  ease,
  customFunctionRender: (value, decimals) => (
    <strong>{value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}</strong>
  ),
};

export default function Total() {
  return <NumberEasing {...props} />;
}
```

`TEaseTypes` remains available as an alias-compatible legacy type name.

## Next.js App Router

The package declares its own client boundary, so a Server Component can render
it directly when its props are serializable:

```tsx
import NumberEasing from 'react-number-easing';

export default function Page() {
  return <NumberEasing value={42} decimals={0} />;
}
```

`customFunctionRender` is a function and therefore cannot cross a
server-to-client boundary. Put that usage in your own Client Component:

```tsx
'use client';

import NumberEasing from 'react-number-easing';

export default function FormattedTotal({ value }: { value: number }) {
  return (
    <NumberEasing
      value={value}
      decimals={2}
      customFunctionRender={(current, decimals) => (
        <strong>{current.toFixed(decimals)}</strong>
      )}
    />
  );
}
```

Effects run only in the browser. Server rendering and the client's first
render both display the same formatted target value, so hydration starts from
matching text.

## Compatibility

- React and React DOM 17 through 19
- Next.js App Router and other React server-rendering frameworks
- TypeScript declarations for Node, Node16/NodeNext, and bundler resolution
- The historical default export and `react-number-easing/src/index.js` path

The v1 scheduler intentionally remains interval-based for compatibility.
Animation-driver changes, reduced-motion defaults, stricter runtime validation,
and modern export-map encapsulation are deferred to v2.
