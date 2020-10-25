# [React Number Easing](https://javier.xyz/react-number-easing/)

React component for fancy number transitions.

[› Online Demo](https://javier.xyz/react-number-easing/).

[![react-number-easing screenshot](assets/number-easing-infinite.gif)](https://javier.xyz/react-number-easing/)


## Installation

```js
npm install react-number-easing --save
```

## Usage.

```jsx
import NumberEasing from 'react-number-easing';

<NumberEasing
  value={15}
  speed={300}
  decimals={0}
  ease='quintInOut' />
```

### Props

* `value`: The value that you want to display at the end of the animation. This is the target value.
* `[speed]`: How fast do you want to finish the animation? Defaults to 500ms.
* `[ease]`: The easing equation for the animation. Defaults to `quintInOut`. You can choose from [mattdesl/eases](https://github.com/mattdesl/eases/blob/master/index.js).
* `[decimals]`: Number of decimal numbers to show.
* `[customFunctionRender]`: Function that replaces the default `Number(value).toString(decimals)` render function. It takes one argument `currentRenderValue` which is a `Float` with the current eased value to render and should return a `string`.