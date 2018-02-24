/* eslint-disable react/prop-types */

import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container">
          <div className="alert alert-danger mt-5" role="alert">
            <h4 className="alert-heading">{this.state.error.toString()}</h4>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {this.state.info.componentStack}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* eslint-enable react/prop-types */
