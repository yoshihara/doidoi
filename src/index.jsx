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

  onChangeTodos(todos) {
    return todos;
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

  _updateTodo(event, index) {
    let todos = this.state.todos.slice();

    switch (event.target.name) {
      case "text":
        todos[index].text = event.target.value;
        break;
      case "done":
        todos[index].done = event.target.checked;
        break;
      default:
        alert(`Unexpected target: ${event.target.name}`);
        return undefined;
    }

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
                name="done"
                defaultChecked={todo.done}
                className="done"
                onChange={e => this._updateTodo(e, i)}
              />
              <input
                type="text"
                name="text"
                defaultValue={todo.text}
                className="text"
                onChange={e => this._updateTodo(e, i)}
              />
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
