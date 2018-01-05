# [React Number Easing](http://javierbyte.github.io/react-number-easing/)

React component for fancy number transitions.

[Live demo](http://javierbyte.github.io/react-number-easing/)

[![react-number-easing screenshot](assets/number-easing-infinite.gif)](http://javierbyte.github.io/react-number-easing/)


## Installation

```js
npm i -S che-react-number-easing
```

## Usage.

```jsx
const NumberEasing = require('che-react-number-easing');

<NumberEasing
  ease="quintInOut"
  precision={2}
  speed={300}
  trail={true}
  useLocaleString={true}
  value={15}
/>
```

### Props

* `[ease]`: The easing equation for the animation.
  * Default: `quintInOut` (You can choose from [mattdesl/eases](https://github.com/mattdesl/eases/blob/master/index.js).)
  * Type: `string`
* `[precision]`: How many decimal places you want to show?
  * Default: `2`
  * Type: `number`
* `[speed]`: How fast do you want to finish the animation?
  * Default:`500` (ms)
  * Type: `number`
* `[trail]`: Do you want trailing zeroes?
  * Default: `false`
  * Type: `boolean`
* `[useLocaleString]`: Use number formatting based on locale?
  * Default: `false`
  * Type: `boolean`
* `[value]`: The value that you want to display at the end of the animation.
  * `Required`
  * Type: `number`

# Build

If you want to build this from source, you will need babel and less.

```js
npm install
```

And run the pre publish script

```js
npm run prepare
```
