import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "something",
      entered: "entered"
    };
  }

  onChange(e) {
    this.setState({message: e.target.value});
  }

  onKeyDown(e) {
    if (e.keyCode == 13) { // 13: Enter
      this.setState({entered: this.state.message})
    }
  }

  render () {
    return (
      <div>
        <input type="text" onChange={ this.onChange.bind(this) } onKeyDown={ this.onKeyDown.bind(this) }/>
        <p>{ this.state.message }</p>
        <p>{ this.state.entered }</p>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
