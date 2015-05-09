var React = require('react');
var NumberEasing = require('../../../dist/index.js');

var ReactDemoPage = React.createClass({

	getInitialState() {
		return {
			number: 0,
			inputValue: 0
		}
	},

	onChangeInputValue(event) {
		this.setState({
			inputValue: event.target.value
		})
	},

	updateNumber(e) {
		e.preventDefault();

		this.setState({
			number: this.state.inputValue
		})
	},

	generateRandom() {
		this.setState({
			inputValue: Math.round(Math.random() * 3000)
		});
	},

    render() {
        return (
            <div>
            	<h1>
				    <NumberEasing
						value={this.state.number}
						speed={2000}/>
				</h1>

				<form onSubmit={this.updateNumber}>
					<input className='big' type='number' value={this.state.inputValue} onChange={this.onChangeInputValue} />

					<div>
						<button type='submit'>Update value</button>
					</div>
					<div>
						<button onClick={this.generateRandom}>generate random</button>
					</div>
				</form>
            </div>
        );
    }

});

React.render(<ReactDemoPage/>, document.getElementById('demo'));
