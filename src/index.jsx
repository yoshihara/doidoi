// Error bountaryの対応 componentDidCatch
"use strict";

import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    let defaultTodos = [];
    let todos = JSON.parse(localStorage.getItem("doidoiTodos")) || defaultTodos;
    this.state = { todos };
  }

  onChangeTodos(todos) {
    this.setState({ todos });
    localStorage.setItem("doidoiTodos", JSON.stringify(todos));
    return todos;
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
    this.state = { todos: this.props.todos, newTodo: "" };
  }

  _handleClick(_event) {
    this.setState({ todos: [] });
    this.props.onChangeTodos([]);
  }

  _handleChange(event, index) {
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

  _handleSubmit(event) {
    let todos = this.state.todos.slice();
    todos = todos.concat({ done: false, text: this.state.newTodo });

    this.setState({ todos, newTodo: "" });
    this.props.onChangeTodos(todos);
    event.preventDefault();
  }

  _handleChangeNewTodo(event) {
    this.setState({ newTodo: event.target.value });
  }

  shouldComponentUpdate(_newProps, _newState) {
    // TODO
    return true;
  }

  _renderTodos() {
    return this.state.todos.map((todo, i) => {
      return (
        // TODO: _renderTodoにわける
        <li key={i}>
          <input type="number" className="orders" />
          <input
            type="checkbox"
            name="done"
            defaultChecked={todo.done}
            className="done"
            onChange={e => this._handleChange(e, i)}
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
    });
  }

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-warning"
          onClick={this._handleClick.bind(this)}
        >
          Clear TODO
        </button>
        <ul>
          {this._renderTodos()}
          <li>
            <form onSubmit={this._handleSubmit.bind(this)}>
              <input
                type="text"
                value={this.state.newTodo}
                onChange={this._handleChangeNewTodo.bind(this)}
              />
              <button type="submit">hoge</button>
            </form>
          </li>
        </ul>
      </div>
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
