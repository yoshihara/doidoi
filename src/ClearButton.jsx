"use strict";

import React from "react";
import PropTypes from "prop-types";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleClick(_event) {
    this.props.onChangeTodos([]);
  }

  render() {
    return (
      <button
        type="button"
        className="btn btn-warning"
        onClick={this._handleClick.bind(this)}
      >
        Clear TODOs
      </button>
    );
  }
}

Menu.propTypes = {
  onChangeTodos: PropTypes.func
};
