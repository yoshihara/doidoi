"use strict";

import React from "react";
import PropTypes from "prop-types";

export default class NewTodos extends React.Component {
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
      if (todo !== "")
        newTodos = newTodos.concat({
          id: null,
          order: null,
          done: false,
          text: todo
        });
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

NewTodos.propTypes = {
  onAddTodos: PropTypes.func
};
