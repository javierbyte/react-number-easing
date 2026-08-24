// @vitest-environment jsdom

import { createElement } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { expect, it, vi } from 'vitest';

import NumberEasing from '../source/index';

it('hydrates the same initial text without a recoverable mismatch', async () => {
  const element = createElement(NumberEasing, { value: 42.25, decimals: 1 });
  const container = document.createElement('div');
  const recoverableErrors: unknown[] = [];
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

  container.innerHTML = renderToString(element);
  const root = hydrateRoot(container, element, {
    onRecoverableError(error) {
      recoverableErrors.push(error);
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(container.textContent).toBe('42.3');
  expect(recoverableErrors).toEqual([]);
  expect(consoleError).not.toHaveBeenCalled();

  root.unmount();
});
