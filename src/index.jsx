"use strict";

import React from "react";
import { render } from "react-dom";

import ErrorBoundary from "./ErrorBoundary.jsx";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.css";

render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("app")
);
