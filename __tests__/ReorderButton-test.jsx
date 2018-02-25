"use strict";

jest.unmock("../src/ClearButton");

import React from "react";
import ReactDom from "react-dom";
import TestUtils from "react-dom/test-utils";
import ReorderButton from "../src/ReorderButton.jsx";

describe("ReorderButton", () => {
  const props = {
    onReorderTodos: jest.fn()
  };

  function setup() {
    const instance = TestUtils.renderIntoDocument(<ReorderButton {...props} />);
    const node = ReactDom.findDOMNode(instance);
    return { instance, node };
  }

  describe("when Clicking", () => {
    it("called onReorderTodos() in props", () => {
      const { node } = setup();

      TestUtils.Simulate.click(node);
      expect(props.onReorderTodos).toBeCalled();
    });
  });
});
