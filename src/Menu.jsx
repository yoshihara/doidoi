"use strict";

import React from "react";
import PropTypes from "prop-types";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleClickReorder(_event) {
    this.props.onReorderTodos();
  }

  _handleClickClear(_event) {
    this.props.onChangeTodos([]);
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={this._handleClickReorder.bind(this)}
          >
            Reorder
          </button>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-warning"
            onClick={this._handleClickClear.bind(this)}
          >
            Clear TODOs
          </button>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  onChangeTodos: PropTypes.func,
  onReorderTodos: PropTypes.func
};
