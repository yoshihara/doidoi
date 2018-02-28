"use strict";

jest.unmock("../src/DoneClearButton");

import React from "react";
import ReactDom from "react-dom";
import TestUtils from "react-dom/test-utils";
import DoneClearButton from "../src/DoneClearButton.jsx";

describe("DoneClearButton", () => {
  const props = {
    onClearDoneTodos: jest.fn()
  };

  function setup() {
    const instance = TestUtils.renderIntoDocument(
      <DoneClearButton {...props} />
    );
    const node = ReactDom.findDOMNode(instance);
    return { instance, node };
  }

  describe("when Clicking", () => {
    it("called onClearDoneTodos() in props", () => {
      const { node } = setup();

      TestUtils.Simulate.click(node);
      expect(props.onClearDoneTodos).toBeCalled();
    });
  });
});
