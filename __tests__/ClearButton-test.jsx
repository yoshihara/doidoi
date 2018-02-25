"use strict";

jest.unmock("../src/ClearButton");

import React from "react";
import ReactDom from "react-dom";
import TestUtils from "react-dom/test-utils";
import ClearButton from "../src/ClearButton.jsx";

describe("ClearButton", () => {
  const props = {
    onChangeTodos: jest.fn()
  };

  function setup() {
    const instance = TestUtils.renderIntoDocument(<ClearButton {...props} />);
    const node = ReactDom.findDOMNode(instance);
    return { instance, node };
  }

  describe("when Clicking", () => {
    it("called onChangeTodos() in props", () => {
      const { node } = setup();

      TestUtils.Simulate.click(node);
      expect(props.onChangeTodos).toBeCalled();
    });
  });
});
