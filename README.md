# React Number Easing

React component for fancy number transitions.

[Live demo](http://javierbyte.github.io/react-number-easing/)

![react-number-easing screenshot](assets/number-easing-infinite.gif)

## Installation

    npm install react-number-easing --save

## Usage.

    var NumberEasing = require('react-number-easing');

    <NumberEasing
		value={15}
		speed={300}
		ease='quadratic-in-out'/>

### Props

* `value`: The value that you want to display at the end of the animation.
* `[speed]`: How fast do you want to finish the animation? Defaults to 500ms.
* `[ease]`: The easing equation for the animation. Defaults to `quartInOut`. You can choose from [mattdesl/eases](https://github.com/mattdesl/eases/blob/master/index.js).

# Build

If you want to build this from source, you will need babel and less.

	npm install -g babel less

And run the pre publish script

	npm run prepublish
