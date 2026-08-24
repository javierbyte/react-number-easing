'use client';

import {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import Eases from 'eases';

export type TEaseTypes =
  | 'backInOut'
  | 'backIn'
  | 'backOut'
  | 'bounceInOut'
  | 'bounceIn'
  | 'bounceOut'
  | 'circInOut'
  | 'circIn'
  | 'circOut'
  | 'cubicInOut'
  | 'cubicIn'
  | 'cubicOut'
  | 'elasticInOut'
  | 'elasticIn'
  | 'elasticOut'
  | 'expoInOut'
  | 'expoIn'
  | 'expoOut'
  | 'linear'
  | 'quadInOut'
  | 'quadIn'
  | 'quadOut'
  | 'quartInOut'
  | 'quartIn'
  | 'quartOut'
  | 'quintInOut'
  | 'quintIn'
  | 'quintOut'
  | 'sineInOut'
  | 'sineIn'
  | 'sineOut';

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

type IntervalCallback = () => void;

function useInterval(callback: IntervalCallback, delay: number | null): void {
  const savedCallback = useRef<IntervalCallback | undefined>(undefined);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function defaultRender(value: number, decimals: number): string {
  return Number(value).toFixed(decimals);
}

function NumberEasing({
  value,
  speed = 500,
  decimals = 0,
  customFunctionRender,
  ease = 'quintInOut',
}: NumberEasingProps): ReactElement {
  const [renderValue, renderValueSet] = useState(value);
  const [lastTarget, lastTargetSet] = useState(value);

  const [lastUpdateTime, lastUpdateTimeSet] = useState(
    new Date().getTime(),
  );

  useEffect(() => {
    lastUpdateTimeSet(new Date().getTime() - 16);
    lastTargetSet(renderValue);
  }, [value]);

  useInterval(() => {
    const currentTime = new Date().getTime();
    const absoluteProgress = (currentTime - lastUpdateTime) / speed;

    if (absoluteProgress >= 1) {
      renderValueSet(value);
    } else {
      const easedProgress = Eases[ease](absoluteProgress);
      renderValueSet(lastTarget + (value - lastTarget) * easedProgress);
    }
  }, 16);

  const functionRender = customFunctionRender || defaultRender;

  return createElement(Fragment, {}, functionRender(renderValue, decimals));
}

export default NumberEasing;
