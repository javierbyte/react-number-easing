import { createElement } from 'react';
import NumberEasing, {
  type EaseName,
  type NumberEasingProps,
  type TEaseTypes,
} from 'react-number-easing';

const ease: EaseName = 'quintInOut';
const legacyEaseName: TEaseTypes = ease;

const props = {
  value: 15,
  speed: 300,
  decimals: 2,
  ease: legacyEaseName,
  customFunctionRender: (value, decimals) =>
    createElement('strong', null, value.toFixed(decimals)),
} satisfies NumberEasingProps;

const component = <NumberEasing {...props} />;

void component;

// @ts-expect-error values are numbers in the documented API
const invalidValue: NumberEasingProps = { value: '15' };

// @ts-expect-error easing names are restricted to the bundled equations
const invalidEase: EaseName = 'not-an-ease';

void invalidValue;
void invalidEase;
