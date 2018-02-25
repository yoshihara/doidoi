"use strict";

import React from "react";
import PropTypes from "prop-types";

export default class ReorderButon extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleClick(_event) {
    this.props.onReorderTodos();
  }

  render() {
    return (
      <button
        type="button"
        className="btn btn-outline-info"
        onClick={this._handleClick.bind(this)}
      >
        Reorder
      </button>
    );
  }
}

ReorderButon.propTypes = {
  onReorderTodos: PropTypes.func
};
