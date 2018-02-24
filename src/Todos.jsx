"use strict";

import React from "react";
import PropTypes from "prop-types";

export default class Todos extends React.Component {
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
    // done: https://getbootstrap.com/docs/4.0/components/buttons/#checkbox-and-radio-buttons でcssで表示するアイコンを変える
    // order,text: 別CSSで通常は下線だけ、フォーカス時はprimaryの下線が出るように
    return (
      <li key={i} className="row col col-sm-12 mb-2">
        <div className="col col-sm-1">
          <input
            type="number"
            className="form-control"
          />
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
