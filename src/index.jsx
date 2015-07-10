var React = require('react');

var eases = require('eases');

var NumberEasing = React.createClass({

    propTypes: {
        value: React.PropTypes.any.isRequired,
        speed: React.PropTypes.number,
        ease: React.PropTypes.oneOf(Object.keys(eases))
    },

    timeout: null,
    startAnimationTime: null,

    getInitialState() {
        var value = parseInt(this.props.value, 10);

        return {
            previousValue: value,
            displayValue: value
        }
    },

    getDefaultProps() {
        return {
            speed: 500,
            ease: 'quintInOut'
        }
    },

    componentWillReceiveProps(nextProps) {
        var value = parseInt(this.props.value, 10);

        if(parseInt(nextProps.value, 10) === value) return;

        this.setState({
            previousValue: this.state.displayValue
        });

        this.startAnimationTime = (new Date()).getTime();
        this.updateNumber();
    },

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.displayValue !== this.state.displayValue;
    },

    updateNumber() {
        var value = parseInt(this.props.value, 10);

        var now = (new Date()).getTime();
        var elapsedTime = (now - this.startAnimationTime);
        var progress = eases[this.props.ease](elapsedTime / this.props.speed);

        var currentDisplayValue = Math.round((value - this.state.previousValue) * progress + this.state.previousValue);

        this.setState({
            displayValue: currentDisplayValue
        });

        if(elapsedTime < this.props.speed) {
            this.timeout = setTimeout(this.updateNumber, 16);
        } else {
            this.setState({
                previousValue: value
            });
        }
    },

    componentWillUnmount() {
        clearTimeout(this.timeout);
    },

    render() {
        var {className, ...other} = this.props;
        var {displayValue} = this.state;

        var classes = 'react-number-easing';
        if(className) classes += ' ' + className;

        return (
            <span {...other} className={classes}>
                {displayValue.toLocaleString()}
            </span>
        );
    }

});

module.exports = NumberEasing;
