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

  onAddTodos(newTodos) {
    let todos = this.state.todos.slice();
    todos = todos.concat(newTodos);
    this.onChangeTodos(todos);
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1>Doing List</h1>
        </div>
        <Todos
          todos={this.state.todos}
          onChangeTodos={this.onChangeTodos.bind(this)}
        />
        <div className="row mt-5">
          <NewTodos onAddTodos={this.onAddTodos.bind(this)} />
        </div>

        <div className="row mt-5">
          <Menu onChangeTodos={this.onChangeTodos.bind(this)} />
        </div>
      </div>
    );
  }
}

class Todos extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleChange(event, index) {
    let todos = this.props.todos.slice();

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

    this.props.onChangeTodos(todos);
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
      <li key={i} className="row col col-sm-12 mb-2">
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

  render() {
    return (
      <div className="row">
        <ul className="col-sm-12 list-unstyled">
          {this.props.todos.map((todo, i) => {
            return this._renderTodo(todo, i);
          })}
        </ul>
      </div>
    );
  }
}

class NewTodos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newTodo: "" };
  }

  _handleSubmit(event) {
    event.preventDefault();

    let newTodo = this.state.newTodo.toString();
    if (newTodo === "") return;

    let newTodos = [];
    newTodo.split("\n").forEach(todo => {
      if (todo !== "") newTodos = newTodos.concat({ done: false, text: todo });
    });

    this.setState({ newTodo: "" });
    this.props.onAddTodos(newTodos);
  }

  _handleChange(event) {
    // NOTE: Adjust height with contents using 'auto' for height once
    this.textarea.style.height = "auto";
    this.textarea.style.height = this.textarea.scrollHeight + "px";

    this.setState({ newTodo: event.target.value });
  }

  _handleKeyUp(event) {
    if (event.ctrlKey && event.keyCode === 13) {
      // Ctrl + Enter
      this._handleSubmit(event);
    }
  }

  render() {
    return (
      <form
        className="col-sm-12 form-inline"
        onSubmit={this._handleSubmit.bind(this)}
      >
        <div className="form-group col-sm-9 offset-sm-1">
          <textarea
            className="form-control col-sm-12"
            ref={text => {
              this.textarea = text;
            }}
            value={this.state.newTodo}
            onChange={this._handleChange.bind(this)}
            onKeyUp={this._handleKeyUp.bind(this)}
          />
        </div>
        <div className="form-group col-sm-1">
          <button type="submit" className="btn btn-primary">
            +
          </button>
        </div>
      </form>
    );
  }
}

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleClick(_event) {
    this.props.onChangeTodos([]);
  }

  render() {
    return (
      <div className="row">
        <button
          type="button"
          className="btn btn-warning"
          onClick={this._handleClick.bind(this)}
        >
          Clear TODOs
        </button>
      </div>
    );
  }
}

NewTodos.propTypes = {
  onAddTodos: PropTypes.func
};

Menu.propTypes = {
  onChangeTodos: PropTypes.func
};

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
