'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {render} from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {todos: [{done: true, text: 'hoge'}, {done: false, text: 'fuga'}]};
  }

  render() {
    return (
      <Todos todos={this.state.todos}></Todos>
    )
  }
}

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {todos: this.props.todos};
  }

  render() {
    return(
      <ul>
        {this.state.todos.map((todo, i) => {
          return(
            <li key={i}>
              <input type='number' className='orders' />
              <input type='checkbox' defaultChecked={todo.done} className='done'/>
              <input type='text' defaultValue={todo.text} className='text' />
            </li>
          )
        })}
      </ul>
    )
  }
}
Todos.propTypes = {
  todos: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    let value = propValue[key];
    if (typeof value.done !== 'boolean') {
      return new Error(`${componentName}.props.${propFullName}.done should be boolean, but ${value.done}`);
    } else if (typeof value.text !== 'string') {
      return new Error(`${componentName}.props.${propFullName}.text should be string, but ${value.text}`);
    } else {
      return true;
    }
  })
}
render(<App/>, document.getElementById('app'));
