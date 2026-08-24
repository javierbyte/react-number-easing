// @vitest-environment jsdom

import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { expect, it, vi } from 'vitest';

import NumberEasing from '../source/index';

// React deduplicates key warnings per element type, so this assertion needs a
// module registry that no other element render has touched yet.
it('does not warn about missing keys for element renderers', async () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  const container = document.createElement('div');

  await act(async () => {
    createRoot(container).render(
      createElement(NumberEasing, {
        value: 12.345,
        decimals: 1,
        customFunctionRender: (value, decimals) =>
          createElement('strong', null, value.toFixed(decimals)),
      }),
    );
  });

  const keyWarnings = consoleError.mock.calls.filter(
    ([message]) =>
      typeof message === 'string' &&
      message.startsWith('Each child in a list should have a unique'),
  );

  expect(container.innerHTML).toBe('<strong>12.3</strong>');
  expect(keyWarnings).toHaveLength(0);

  consoleError.mockRestore();
});
