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
import NumberEasing from 'react-number-easing';

<NumberEasing
  ease="quintInOut"
  precision={2}
  speed={300}
  useLocaleString={true}
  value={15}
/>
```

### Props

* `[ease]`: The easing equation for the animation. _Default: `quintInOut` (You can choose from [mattdesl/eases](https://github.com/mattdesl/eases/blob/master/index.js).)_
* `[precision]`: How many decimal places you want to show? _Default: `2`_
* `[speed]`: How fast do you want to finish the animation? _Default:`500ms`_
* `[useLocaleString]`: Use number formatting based on locale? _Default: `false`_
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
