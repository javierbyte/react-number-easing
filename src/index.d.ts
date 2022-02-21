/**
 * Definition types
 */
declare module 'react-number-easing' {
  import * as React from 'react'

  import type TEases from 'eases'
  type TEaseTypes = keyof typeof TEases

  interface NumberEasingProps {
    /**
     * The value that you want to display at the end of the animation. This is the target value.
     */
    value: number,
    /**
     * How fast do you want to finish the animation?
     * @default 500
     */
    speed?: number,
    /**
     * The easing equation for the animation.
     * @default 'quintInOut'
     */
    ease?: TEaseTypes,
    /**
     * Decimals number
     * @default 0
     */
    decimals?: number,
    /**
     * Function that replaces the default `Number(value).toString(decimals)` render function.
     * @default undefined
     */
    customFunctionRender?: (value: number, decimals: number) => string,
  }

  const NumberEasing: React.FC<NumberEasingProps>

  export default NumberEasing
}
