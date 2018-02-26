"use strict";

import React from "react";
import Todos from "./Todos.jsx";
import NewTodos from "./NewTodos.jsx";
import ReorderButton from "./ReorderButton.jsx";
import ClearButton from "./ClearButton.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let defaultTodos = "[]";
    let todos = JSON.parse(localStorage.getItem("doidoiTodos") || defaultTodos);
    this.state = { todos };
  }

  _updateTodos(todos) {
    this.setState({ todos });
    localStorage.setItem("doidoiTodos", JSON.stringify(todos));
    return todos;
  }

  onReorderTodos() {
    let todos = this.state.todos.slice();
    todos = todos.sort(function(a, b) {
      return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
    });

    this._updateTodos(todos);
  }

  onChangeTodos(todos) {
    this._updateTodos(todos);
  }

  onAddTodos(newTodos) {
    let todos = this.state.todos.slice();
    let nextId = todos.length;
    newTodos = newTodos.map((todo, i) => {
      todo.id = nextId + i;
      return todo;
    });
    todos = todos.concat(newTodos);

    this._updateTodos(todos);
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1>Doing List</h1>
        </div>
        <div className="row">
          <Todos
            todos={this.state.todos}
            onChangeTodos={this.onChangeTodos.bind(this)}
          />
        </div>

        <div className="row mt-5">
          <NewTodos onAddTodos={this.onAddTodos.bind(this)} />
        </div>

        <div className="row mt-5">
          <div className="col col-sm-auto">
            <ReorderButton onReorderTodos={this.onReorderTodos.bind(this)} />
          </div>
          <div className="col col-sm-auto">
            <ClearButton onChangeTodos={this.onChangeTodos.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}
