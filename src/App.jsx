"use strict";

import React from "react";
import Todos from "./Todos.jsx";
import NewTodos from "./NewTodos.jsx";
import ReorderButton from "./ReorderButton.jsx";
import ClearButton from "./ClearButton.jsx";
import DoneClearButton from "./DoneClearButton.jsx";

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
    todos = todos.sort((a, b) => {
      if (a.order < b.order) return -1;
      else if (a.order > b.order) return 1;
      else return 0;
    });

    this._updateTodos(todos);
  }

  onClearDoneTodos() {
    let todos = this.state.todos.slice();
    todos = todos.filter(todo => {
      if (!todo.done) return todo;
    });

    this._updateTodos(todos);
  }

  onChangeTodos(todos) {
    todos = todos.map(todo => {
      if (todo.order == "") todo.order = null;
      return todo;
    });
    this._updateTodos(todos);
  }

  onAddTodos(newTodos) {
    let todos = this.state.todos.slice();

    todos = todos.concat(newTodos);
    todos = todos.map((todo, i) => {
      todo.id = i;
      return todo;
    });

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
          <div className="col col-sm-auto">
            <DoneClearButton
              onClearDoneTodos={this.onClearDoneTodos.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
