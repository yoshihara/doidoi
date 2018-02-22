"use strict";

import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ done: true, text: "hoge" }, { done: false, text: "fuga" }]
    };
  }

  onChangeTodos(todo) {
    return todo;
    // TODO
    // console.log(`SAVE: ${JSON.stringify(todos)}`);
  }

  render() {
    return (
      <Todos
        todos={this.state.todos}
        onChangeTodos={this.onChangeTodos.bind(this)}
      />
    );
  }
}

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: this.props.todos };
  }

  _toggleDone(i) {
    let todos = this.state.todos.slice();
    todos[i].done = !todos[i].done;
    this.setState(todos);
    this.props.onChangeTodos(todos);
  }

  shouldComponentUpdate(_newProps, _newState) {
    // TODO
    return true;
  }

  render() {
    return (
      <ul>
        {this.state.todos.map((todo, i) => {
          return (
            <li key={i}>
              <input type="number" className="orders" />
              <input
                type="checkbox"
                defaultChecked={todo.done}
                className="done"
                onChange={this._toggleDone.bind(this, i)}
              />
              <input type="text" defaultValue={todo.text} className="text" />
            </li>
          );
        })}
      </ul>
    );
  }
}

Todos.propTypes = {
  onChangeTodos: PropTypes.func,
  todos: PropTypes.arrayOf(function(
    propValue,
    key,
    componentName,
    location,
    propFullName
  ) {
    let value = propValue[key];
    if (typeof value.done !== "boolean") {
      return new Error(
        `${componentName}.props.${propFullName}.done should be boolean, but ${
          value.done
        }`
      );
    } else if (typeof value.text !== "string") {
      return new Error(
        `${componentName}.props.${propFullName}.text should be string, but ${
          value.text
        }`
      );
    } else {
      return true;
    }
  })
};

render(<App />, document.getElementById("app"));
