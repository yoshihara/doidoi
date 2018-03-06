"use strict";

jest.unmock("../src/Todos");

import React from "react";
import { shallow, mount } from "enzyme";
import Todos from "../src/Todos.jsx";

describe("Todos", () => {
  const props = {
    onChangeTodos: jest.fn(),
    todos: [
      { done: false, id: 0, order: "10", text: "todo1" },
      { done: true, id: 1, order: null, text: "todo2" }
    ]
  };
  const alert = window.alert;

  beforeEach(() => {
    window.alert = jest.fn();
  });

  afterEach(() => {
    props.onChangeTodos.mockReset();
    window.alert = alert;
  });

  function setup() {
    const instance = mount(<Todos {...props} />);
    const ul = instance.find("ul");
    const li = ul.find("li").first();
    return { ul, li };
  }

  describe("props validation", () => {
    describe("todo", () => {
      it("id", () => {
        let todo = { done: false, id: "invalid", order: "10", text: "todo1" };
        expect(() => {
          shallow(<Todos todos={[todo]} />);
        }).toThrow();
      });

      it("done", () => {
        let todo = { done: "unexpected", id: 0, order: "10", text: "todo1" };
        expect(() => {
          shallow(<Todos todos={[todo]} />);
        }).toThrow();
      });

      it("order", () => {
        let todo = { done: false, id: 0, order: 123, text: "todo1" };
        expect(() => {
          shallow(<Todos todos={[todo]} />);
        }).toThrow();
      });

      it("text", () => {
        let todo = { done: false, id: 0, order: "10", text: 123 };
        expect(() => {
          shallow(<Todos todos={[todo]} />);
        }).toThrow();
      });
    });
  });

  describe("display", () => {
    const { ul } = setup();

    it("shows todos passed by props", () => {
      expect(ul.children("li")).toHaveLength(props.todos.length);

      const firstLi = ul.children("li").first();
      expect(firstLi.find("input[name='order']").props().value).toBe("10");
      expect(firstLi.find("input[name='done']").props().checked).toBe(false);
      expect(firstLi.find("input[name='text']").props().value).toBe("todo1");

      const lastLi = ul.children("li").last();
      expect(lastLi.find("input[name='order']").props().value).toBe("");
      expect(lastLi.find("input[name='done']").props().checked).toBe(true);
      expect(lastLi.find("input[name='text']").props().value).toBe("todo2");
    });
  });

  describe("change values", () => {
    const { li } = setup();

    function generateNextTodos(obj) {
      let nextTodos = props.todos.slice();
      nextTodos[0] = Object.assign(nextTodos[0], obj);
      return nextTodos;
    }

    it("changed todo's order", () => {
      const nextOrder = 99;
      const nextTodos = generateNextTodos({ order: nextOrder });

      const order = li.find("input[name='order']");
      order.simulate("change", { target: { name: "order", value: nextOrder } });
      expect(props.onChangeTodos).toBeCalledWith(nextTodos);
    });

    it("changed todo's order to not number value", () => {
      const nextOrder = "not number";
      const nextTodos = generateNextTodos({ order: 0 });

      const order = li.find("input[name='order']");
      order.simulate("change", { target: { name: "order", value: nextOrder } });
      expect(props.onChangeTodos).toBeCalledWith(nextTodos);
    });

    it("changed todo's done check", () => {
      const nextDone = true;
      const nextTodos = generateNextTodos({ done: nextDone });

      const order = li.find("input[name='done']");
      order.simulate("change", { target: { name: "done", value: nextDone } });
      expect(props.onChangeTodos).toBeCalledWith(nextTodos);
    });

    it("changed todo's text", () => {
      const nextText = "next todo";
      const nextTodos = generateNextTodos({ text: nextText });

      const order = li.find("input[name='text']");
      order.simulate("change", { target: { name: "text", value: nextText } });
      expect(props.onChangeTodos).toBeCalledWith(nextTodos);
    });

    it("changed unexpected type", () => {
      const order = li.find("input[name='text']");
      order.simulate("change", {
        target: { name: "unexpected", value: "unexpected" }
      });
      expect(window.alert).toBeCalledWith("Unexpected target: unexpected");
      expect(props.onChangeTodos).not.toBeCalled();
    });
  });

  describe("Click button to remove todo", () => {
    const confirm = window.confirm;
    const confirmMock = jest.fn();
    confirmMock.mockReturnValueOnce(false).mockReturnValueOnce(true);
    window.confirm = confirmMock;

    const { li } = setup();

    const button = li.find("button");

    button.simulate("click");
    // Clicking "Cancel" in confirm
    expect(props.onChangeTodos).not.toBeCalled();

    button.simulate("click");
    // Clicking "OK" in confirm
    expect(props.onChangeTodos).toBeCalledWith([props.todos[1]]);

    window.confirm = confirm;
  });
});
