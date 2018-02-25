"use strict";

jest.unmock("../src/NewTodos");

import React from "react";
import { mount } from "enzyme";
import NewTodos from "../src/NewTodos.jsx";

describe("NewTodos", () => {
  const props = {
    onAddTodos: jest.fn()
  };

  afterEach(() => {
    props.onAddTodos.mockReset();
  });

  function setup() {
    const instance = mount(<NewTodos {...props} />);
    const form = instance.find("form");
    return { instance, form };
  }

  describe("keyUp", () => {
    describe("when hit Ctrl + Enter in textarea", () => {
      const { form } = setup();

      it("called onAddTodos()", () => {
        const expected = [
          { done: false, id: null, order: null, text: "todo1" }
        ];
        const textarea = form.find("textarea");
        textarea.simulate("change", { target: { value: "todo1" } });
        textarea.simulate("keyUp", { ctrlKey: true, keyCode: 13 });

        expect(props.onAddTodos).toBeCalledWith(expected);
      });
    });

    describe("when hit Enter in textarea", () => {
      const { form } = setup();

      it("not called onAddTodos()", () => {
        const textarea = form.find("textarea");
        textarea.simulate("change", { target: { value: "todo1" } });
        textarea.simulate("keyUp", { keyCode: 13 });

        expect(props.onAddTodos).not.toBeCalled();
      });
    });
  });

  describe("when submitted", () => {
    const { form } = setup();

    describe("when textarea is any text", () => {
      it("called onAddTodos() with todos", () => {
        const expected = [
          { done: false, id: null, order: null, text: "todo1" },
          { done: false, id: null, order: null, text: "todo2" }
        ];

        const textarea = form.find("textarea");
        textarea.simulate("change", { target: { value: "todo1\n\ntodo2" } });
        form.simulate("submit");

        expect(props.onAddTodos).toBeCalledWith(expected);
      });
    });

    describe("when textarea is blank", () => {
      it("not called onAddTodos()", () => {
        form.simulate("submit");

        expect(props.onAddTodos).not.toBeCalled();
      });
    });
  });
});
