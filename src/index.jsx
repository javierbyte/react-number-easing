/*
  From
  https://github.com/javierbyte/react-number-easing
  Refactored to use React class.
*/

import eases from 'eases';
import PropTypes from 'prop-types';
import React from 'react';

class NumberEasing extends React.Component {
  constructor(props) {
    super(props);

    const { value, precision, trail } = this.props;

    this.timeout = null;
    this.startAnimationTime = null;
    this.state = {
      displayValue: value,
      // eslint-disable-next-line no-restricted-globals
      previousValue:
        trail && !isNaN(parseFloat(value))
          ? parseFloat(value).toFixed(precision > -1 ? precision : 0)
          : value,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value, delayValue } = this.props;
    const { displayValue } = this.state;

    if (parseFloat(nextProps.value) === value) {
      return;
    }

    this.setState({
      previousValue: displayValue,
    });

    if (!window.isNaN(parseInt(delayValue, 10))) {
      this.delayTimeout = setTimeout(() => {
        this.startAnimationTime = new Date().getTime();
        this.updateNumber();
      }, delayValue);
    } else {
      this.startAnimationTime = new Date().getTime();
      this.updateNumber();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { displayValue } = this.state;
    return nextState.displayValue !== displayValue;
  }

  updateNumber = () => {
    const { value, precision, speed, ease } = this.props;
    const { previousValue } = this.state;
    const now = new Date().getTime();
    const elapsedTime = Math.min(speed, now - this.startAnimationTime);
    const progress = eases[ease](elapsedTime / speed);

    const currentDisplayValue =
      Math.round(
        ((value - previousValue) * progress + previousValue) *
          Math.pow(10, precision)
      ) / Math.pow(10, precision);

    this.setState({
      displayValue: currentDisplayValue,
    });

    if (elapsedTime < speed) {
      this.timeout = setTimeout(this.updateNumber, 16);
    } else {
      this.setState({
        previousValue: value,
      });
    }
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
    clearTimeout(this.delayTimeout);
  }

  render() {
    const {
      className,
      currency,
      delayValue,
      ease,
      locale,
      precision,
      speed,
      trail,
      useLocaleString,
      value,
      ...other
    } = this.props;
    const { displayValue } = this.state;

    let classes = 'react-number-easing';
    if (className) {
      classes += ` ${className}`;
    }

    const opts = {};
    if (useLocaleString && currency) {
      opts.currency = currency;
      opts.style = 'currency';
    }

    return (
      <span {...other} className={classes}>
        {useLocaleString
          ? parseFloat(displayValue).toLocaleString(locale, opts)
          : trail
          ? parseFloat(displayValue).toFixed(precision > -1 ? precision : 0)
          : displayValue}
      </span>
    );
  }
}

NumberEasing.propTypes = {
  currency: PropTypes.string,
  delayValue: PropTypes.number,
  ease: PropTypes.oneOf(Object.keys(eases)),
  locale: PropTypes.string,
  precision: PropTypes.number,
  speed: PropTypes.number,
  trail: PropTypes.bool,
  useLocaleString: PropTypes.bool,
  value: PropTypes.any.isRequired,
};

NumberEasing.defaultProps = {
  currency: '',
  delayValue: 50,
  ease: 'quintInOut',
  locale: 'en-US',
  precision: 2,
  speed: 500,
  trail: false,
  useLocaleString: true,
};

export default NumberEasing;
