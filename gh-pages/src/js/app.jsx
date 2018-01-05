/*
  From
  https://github.com/javierbyte/react-number-easing
  Refactored to use React class.
*/

import React from 'react';
import ReactDOM from 'react-dom';

import NumberEasing from '../../../dist/index';

class ReactDemoPage extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: 0,
			number: 0,
		};
	}

	componentDidMount() {
		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState({
			number: 1000.00,
		});
	}

	onChangeInputValue = (e) => {
		this.setState({
			inputValue: e.target.value,
		});
	}

	updateNumber = (e) => {
		e.preventDefault();

		this.setState({
			number: this.state.inputValue,
		});
	}

	generateRandom = () => {
		this.setState({
			inputValue: parseFloat(Math.min(0 + (Math.random() * (3000 - 0)), 3000).toFixed(2)),
		});
	}

	render() {
		return (
			<div>
				<h1>
					<NumberEasing
						value={this.state.number}
						speed={2000}
					/>
				</h1>

				<form onSubmit={this.updateNumber}>
					<input
						className="big"
						onChange={this.onChangeInputValue}
						step="any"
						type="number"
						value={this.state.inputValue}
					/>
					<div>
						<button type="submit">Update value</button>
					</div>
					<div>
						<button onClick={this.generateRandom}>Random</button>
					</div>
				</form>
			</div>
		);
	}
}

export default ReactDemoPage;

ReactDOM.render(<ReactDemoPage />, document.getElementById('demo'));
