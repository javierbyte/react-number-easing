import { createElement, type ReactElement } from 'react';
import { renderToString } from 'react-dom/server';
import TestRenderer, {
  act,
  type ReactTestRenderer,
} from 'react-test-renderer';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import NumberEasing, {
  type NumberEasingProps,
  type TEaseTypes,
} from '../source/index';

const originalConsoleError = console.error;

const EASING_NAMES: TEaseTypes[] = [
  'backInOut',
  'backIn',
  'backOut',
  'bounceInOut',
  'bounceIn',
  'bounceOut',
  'circInOut',
  'circIn',
  'circOut',
  'cubicInOut',
  'cubicIn',
  'cubicOut',
  'elasticInOut',
  'elasticIn',
  'elasticOut',
  'expoInOut',
  'expoIn',
  'expoOut',
  'linear',
  'quadInOut',
  'quadIn',
  'quadOut',
  'quartInOut',
  'quartIn',
  'quartOut',
  'quintInOut',
  'quintIn',
  'quintOut',
  'sineInOut',
  'sineIn',
  'sineOut',
];

function render(props: NumberEasingProps): ReactTestRenderer {
  let renderer: ReactTestRenderer | undefined;

  act(() => {
    renderer = TestRenderer.create(createElement(NumberEasing, props));
  });

  return renderer!;
}

function update(
  renderer: ReactTestRenderer,
  props: NumberEasingProps,
): void {
  act(() => {
    renderer.update(createElement(NumberEasing, props));
  });
}

function advance(milliseconds: number): void {
  act(() => {
    vi.advanceTimersByTime(milliseconds);
  });
}

function unmount(renderer: ReactTestRenderer): void {
  act(() => {
    renderer.unmount();
  });
}

describe('NumberEasing compatibility behavior', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    (
      globalThis as typeof globalThis & {
        IS_REACT_ACT_ENVIRONMENT: boolean;
      }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.spyOn(console, 'error').mockImplementation((...arguments_) => {
      const message = arguments_[0];
      if (
        typeof message === 'string' &&
        message.startsWith('react-test-renderer is deprecated')
      ) {
        return;
      }
      originalConsoleError(...arguments_);
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the initial value with the existing defaults', () => {
    const renderer = render({ value: 15.8 });

    expect(renderer.toJSON()).toBe('16');

    unmount(renderer);
  });

  it('formats the configured number of decimals', () => {
    const renderer = render({ value: 15.876, decimals: 2 });

    expect(renderer.toJSON()).toBe('15.88');

    unmount(renderer);
  });

  it('passes the current value and decimals to a custom React renderer', () => {
    const customFunctionRender = vi.fn(
      (value: number, decimals: number): ReactElement =>
        createElement('strong', null, value.toFixed(decimals)),
    );
    const renderer = render({
      value: 12.345,
      decimals: 1,
      customFunctionRender,
    });

    expect(customFunctionRender).toHaveBeenLastCalledWith(12.345, 1);
    expect(renderer.toJSON()).toMatchObject({
      type: 'strong',
      children: ['12.3'],
    });

    unmount(renderer);
  });

  it.each(EASING_NAMES)('supports the %s easing equation', (ease) => {
    const renderer = render({ value: 0, ease, speed: 100 });

    update(renderer, { value: 10, ease, speed: 100 });
    advance(16);

    expect(renderer.toJSON()).not.toBeNull();

    unmount(renderer);
  });

  it('preserves the increasing and decreasing interval trajectory', () => {
    const increasing = render({ value: 0, ease: 'linear', speed: 100 });
    update(increasing, { value: 100, ease: 'linear', speed: 100 });
    advance(16);
    expect(increasing.toJSON()).toBe('32');
    unmount(increasing);

    vi.setSystemTime(0);
    const decreasing = render({ value: 100, ease: 'linear', speed: 100 });
    update(decreasing, { value: 0, ease: 'linear', speed: 100 });
    advance(16);
    expect(decreasing.toJSON()).toBe('68');
    unmount(decreasing);
  });

  it('starts rapid updates from the currently rendered value', () => {
    const renderer = render({ value: 0, ease: 'linear', speed: 100 });

    update(renderer, { value: 100, ease: 'linear', speed: 100 });
    advance(16);
    expect(renderer.toJSON()).toBe('32');

    update(renderer, { value: 200, ease: 'linear', speed: 100 });
    advance(16);
    expect(renderer.toJSON()).toBe('86');

    unmount(renderer);
  });

  it('sets the exact target when the duration completes', () => {
    const renderer = render({ value: 0, ease: 'linear', speed: 100 });

    update(renderer, { value: 10, ease: 'linear', speed: 100 });
    advance(100);

    expect(renderer.toJSON()).toBe('10');

    unmount(renderer);
  });

  it('clears its interval when unmounted', () => {
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
    const renderer = render({ value: 1 });

    unmount(renderer);

    expect(clearIntervalSpy).toHaveBeenCalledOnce();
  });

  it('renders the target during SSR without starting an interval', () => {
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');

    expect(
      renderToString(
        createElement(NumberEasing, { value: 12.34, decimals: 1 }),
      ),
    ).toBe('12.3');
    expect(setIntervalSpy).not.toHaveBeenCalled();
  });
});
