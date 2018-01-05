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

		const { value } = this.props;

		this.timeout = null;
		this.startAnimationTime = null;
		this.state = {
			displayValue: value,
			previousValue: value,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { value } = this.props;

		if (parseFloat(nextProps.value) === value) {
			return;
		}

		this.setState({
			previousValue: this.state.displayValue,
		});

		if (!window.isNaN(parseInt(this.props.delayValue, 10))) {
			this.delayTimeout = setTimeout(() => {
				this.startAnimationTime = new Date().getTime();
				this.updateNumber();
			}, this.props.delayValue);
		} else {
			this.startAnimationTime = new Date().getTime();
			this.updateNumber();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.displayValue !== this.state.displayValue;
	}

	updateNumber = () => {
		const { value, precision } = this.props;
		const now = new Date().getTime();
		const elapsedTime = Math.min(
			this.props.speed,
			now - this.startAnimationTime,
		);
		const progress = eases[this.props.ease](elapsedTime / this.props.speed);

		const currentDisplayValue = Math.round(((
			(value - this.state.previousValue) * progress) + this.state.previousValue) *
			Math.pow(10, precision)) / Math.pow(10, precision);

		this.setState({
			displayValue: currentDisplayValue,
		});

		if (elapsedTime < this.props.speed) {
			this.timeout = setTimeout(this.updateNumber, 16);
		} else {
			this.setState({
				previousValue: value,
			});
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
		clearTimeout(this.delayTimeout);
	}

	render() {
		const {
			className,
			delayValue,
			ease,
			precision,
			speed,
			useLocaleString,
			value,
			...other
		} = this.props;
		const { displayValue } = this.state;

		let classes = 'react-number-easing';
		if (className) {
			classes += ` ${className}`;
		}

		return (
			<span {...other} className={classes}>
				{useLocaleString ? displayValue.toLocaleString() : displayValue}
			</span>
		);
	}
}

NumberEasing.propTypes = {
	delayValue: PropTypes.number,
	ease: PropTypes.oneOf(Object.keys(eases)),
	precision: PropTypes.number,
	speed: PropTypes.number,
	useLocaleString: PropTypes.bool,
	value: PropTypes.any.isRequired,
};

NumberEasing.defaultProps = {
	delayValue: 50,
	ease: 'quintInOut',
	precision: 2,
	speed: 500,
	useLocaleString: false,
};

export default NumberEasing;
