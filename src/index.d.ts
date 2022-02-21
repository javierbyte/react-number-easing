/**
 * Definition types
 */
declare module 'react-number-easing' {
  import * as React from 'react'

  // Referenced from @types/eases
  type TEaseTypes = 'backInOut' | 'backIn' | 'backOut' | 'bounceInOut' | 'bounceIn' | 'bounceOut' | 'circInOut' | 'circIn' | 'circOut' | 'cubicInOut' | 'cubicIn' | 'cubicOut' | 'elasticInOut' | 'elasticIn' | 'elasticOut' | 'expoInOut' | 'expoIn' | 'expoOut' | 'linear' | 'quadInOut' | 'quadIn' | 'quadOut' | 'quartInOut' | 'quartIn' | 'quartOut' | 'quintInOut' | 'quintIn' | 'quintOut' | 'sineInOut' | 'sineIn' | 'sineOut'

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
