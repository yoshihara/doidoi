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
          <Menu
             onChangeTodos={this.onChangeTodos.bind(this)}
           />
        </div>
      </div>
    );
  }
}
