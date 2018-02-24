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
    event.preventDefault();

    let newTodo = this.state.newTodo.toString();
    if (newTodo === "") return;

    let todos = this.state.todos.slice();
    todos = todos.concat({ done: false, text: newTodo });

    this.setState({ todos, newTodo: "" });
    this.props.onChangeTodos(todos);
  }

  _handleChangeNewTodo(event) {
    this.setState({ newTodo: event.target.value });
  }

  shouldComponentUpdate(_newProps, _newState) {
    // TODO
    return true;
  }

  _renderTodo(todo, i) {
    // TODO: デザイン調整
    // done: inputはhiddenにしてlabelクリックで表示切り替え
    // order,text: 別CSSで通常は下線だけ、フォーカス時はprimaryの下線が出るように
    return (
      <li key={i} className="row col col-sm-12 justify-content-md-center mb-2">
        <div className="col col-sm-1">
          <input type="number" className="form-control" />
        </div>
        <div className="col col-sm-auto form-check">
          <input
            type="checkbox"
            name="done"
            defaultChecked={todo.done}
            id={"done-" + i}
            className="form-check-input"
            onChange={e => this._handleChange(e, i)}
          />
          <label htmlFor={"done-" + i} className="form-check-label">
            -
          </label>
        </div>
        <div className="col col-sm-10">
          <input
            type="text"
            name="text"
            defaultValue={todo.text}
            className="form-control"
            onChange={e => this._handleChange(e, i)}
          />
        </div>
      </li>
    );
  }

  _renderTodos() {
    return this.state.todos.map((todo, i) => {
      return this._renderTodo(todo, i);
    });
  }

  _renderNewTodoForm() {
    return (
      <form onSubmit={this._handleSubmit.bind(this)}>
        <input
          type="text"
          value={this.state.newTodo}
          onChange={this._handleChangeNewTodo.bind(this)}
        />
        <button type="submit">+</button>
      </form>
    );
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1>Doing List</h1>
        </div>
        <div className="row">
          <button
            type="button"
            className="btn btn-warning"
            onClick={this._handleClick.bind(this)}
          >
            Clear TODOs
          </button>
        </div>
        <div>
          <ul className="list-unstyled">{this._renderTodos()}</ul>
        </div>
        <div className="row">{this._renderNewTodoForm()}</div>
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
