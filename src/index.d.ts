import { type ReactElement, type ReactNode } from 'react';
export type TEaseTypes = 'backInOut' | 'backIn' | 'backOut' | 'bounceInOut' | 'bounceIn' | 'bounceOut' | 'circInOut' | 'circIn' | 'circOut' | 'cubicInOut' | 'cubicIn' | 'cubicOut' | 'elasticInOut' | 'elasticIn' | 'elasticOut' | 'expoInOut' | 'expoIn' | 'expoOut' | 'linear' | 'quadInOut' | 'quadIn' | 'quadOut' | 'quartInOut' | 'quartIn' | 'quartOut' | 'quintInOut' | 'quintIn' | 'quintOut' | 'sineInOut' | 'sineIn' | 'sineOut';
export type EaseName = TEaseTypes;
export interface NumberEasingProps {
    /** The target value displayed at the end of the animation. */
    value: number;
    /** Animation duration in milliseconds. @default 500 */
    speed?: number;
    /** Easing equation used for the animation. @default 'quintInOut' */
    ease?: TEaseTypes;
    /** Number of decimal places to display. @default 0 */
    decimals?: number;
    /** Replaces the default `Number(value).toFixed(decimals)` renderer. */
    customFunctionRender?: (value: number, decimals: number) => ReactNode;
}
declare function NumberEasing({ value, speed, decimals, customFunctionRender, ease, }: NumberEasingProps): ReactElement;
export default NumberEasing;
