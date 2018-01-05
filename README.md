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
var NumberEasing = require('react-number-easing');

<NumberEasing
  ease="quintInOut"
  precision={2}
  speed={300}
  value={15}
/>
```

### Props

* `[ease]`: The easing equation for the animation. Defaults to `quintInOut`. You can choose from [mattdesl/eases](https://github.com/mattdesl/eases/blob/master/index.js).
* `[precision]`: How many decimal places you want to show.
* `[speed]`: How fast do you want to finish the animation? Defaults to 500ms.
* `[useLocaleString]`: Should use `toLocaleString()`?
* `[value]`: The value that you want to display at the end of the animation.

# Build

If you want to build this from source, you will need babel and less.

```js
npm i -g babel less
```

And run the pre publish script

```js
npm run prepare
```
