"use strict";

import React from "react";
import PropTypes from "prop-types";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleClick(_event) {
    this.props.onClearDoneTodos([]);
  }

  render() {
    return (
      <button
        type="button"
        className="btn btn-dark"
        onClick={this._handleClick.bind(this)}
      >
        Clear Done TODOs
      </button>
    );
  }
}

Menu.propTypes = {
  onClearDoneTodos: PropTypes.func
};
