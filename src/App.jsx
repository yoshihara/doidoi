"use strict";

// Error bountaryの対応 componentDidCatch

import React from "react";
import Todos from "./Todos.jsx";
import NewTodos from "./NewTodos.jsx";
import Menu from "./Menu.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let defaultTodos = [];
    let todos = JSON.parse(localStorage.getItem("doidoiTodos")) || defaultTodos;
    this.state = { todos };
  }

  onReorderTodos() {
    let todos = this.state.todos.slice();
    todos = todos.sort(function(a, b) {
      return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
    });

    this.onChangeTodos(todos);
  }

  onChangeTodos(todos) {
    this.setState({ todos });
    localStorage.setItem("doidoiTodos", JSON.stringify(todos));
    return todos;
  }

  onAddTodos(newTodos) {
    let todos = this.state.todos.slice();
    let nextId = todos.length;
    newTodos = newTodos.map((todo, i) => {
      todo.id = nextId + i;
      return todo;
    });
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
          <Menu
            onReorderTodos={this.onReorderTodos.bind(this)}
            onChangeTodos={this.onChangeTodos.bind(this)}
          />
        </div>
      </div>
    );
  }
}
