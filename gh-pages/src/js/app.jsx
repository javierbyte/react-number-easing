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
      precision: 2,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      number: 1000,
    });
  }

  onChangeInputValue = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  updateNumber = (e) => {
    e.preventDefault();

    this.setState({
      number: this.state.inputValue,
    });
  };

  updatePrecision = (e) => {
    this.setState({
      precision: e.target.value,
    });
  };

  generateRandom = () => {
    const prec = this.state.precision > -1 ? this.state.precision : 0;
    this.setState({
      inputValue: parseFloat(
        Math.min(0 + Math.random() * (3000 - 0), 3000).toFixed(prec)
      ),
    });
  };

  render() {
    return (
      <div>
        <h1>
          <NumberEasing
            precision={parseInt(this.state.precision, 10)}
            speed={2000}
            trail={true}
            useLocaleString={true}
            value={this.state.number}
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
            <input
              max="5"
              min="-2"
              onChange={this.updatePrecision}
              step="1"
              type="number"
              value={this.state.precision}
            />
            <button onClick={this.generateRandom}>Random</button>
          </div>
        </form>
      </div>
    );
  }
}

export default ReactDemoPage;

ReactDOM.render(<ReactDemoPage />, document.getElementById('demo'));
