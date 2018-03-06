"use strict";

jest.unmock("../src/App");

import React from "react";
import { shallow } from "enzyme";
import App from "../src/App.jsx";

describe("App", () => {
  function createLocalStroageMock() {
    class localStorage {
      constructor() {
        this.store = {};
      }
      getItem(key) {
        return key in this.store ? this.store[key] : undefined;
      }
      setItem(key, value) {
        this.store[key] = value;
        return value;
      }
      clear() {
        this.store = {};
      }
    }

    global.localStorage = new localStorage();
  }

  function clearLocalStorageMock() {
    localStorage.clear();
  }

  function setup() {
    const instance = shallow(<App />);
    const component = instance.instance();
    return { instance, component };
  }

  beforeEach(() => {
    createLocalStroageMock();
  });

  afterEach(() => {
    clearLocalStorageMock();
  });

  describe("Init", () => {
    it("use defaultTodos", () => {
      const { instance } = setup();
      expect(instance.state("todos")).toEqual([]);
    });
  });

  describe("_updateTodos()", () => {
    it("converts todos to JSON and store JSON", () => {
      const { instance, component } = setup();
      const todos = [{ done: false, id: 0, order: "10", text: "todo1" }];
      const json = '[{"done":false,"id":0,"order":"10","text":"todo1"}]';

      localStorage.setItem = jest.fn();

      component._updateTodos(todos);
      expect(instance.state("todos")).toEqual(todos);
      expect(localStorage.setItem).toBeCalledWith("doidoiTodos", json);
    });
  });

  describe("onReorderTodos()", () => {
    it("reorders todos and store", () => {
      const { instance, component } = setup();
      const todos = [
        { done: false, id: 0, order: "10", text: "todo1" },
        { done: false, id: 1, order: "20", text: "todo2" },
        { done: false, id: 5, order: null, text: "null todo" },
        { done: false, id: 4, order: "10", text: "todo1" },
        { done: false, id: 2, order: "10", text: "todo3" },
        { done: false, id: 3, order: null, text: "null todo2" }
      ];
      instance.setState({ todos: todos });

      component.onReorderTodos();

      expect(instance.state("todos")).toEqual([
        { done: false, id: 0, order: "10", text: "todo1" },
        { done: false, id: 4, order: "10", text: "todo1" },
        { done: false, id: 2, order: "10", text: "todo3" },
        { done: false, id: 1, order: "20", text: "todo2" },
        { done: false, id: 5, order: null, text: "null todo" },
        { done: false, id: 3, order: null, text: "null todo2" }
      ]);
    });
  });

  describe("onChangeTodos()", () => {
    it("calls func to update", () => {
      const { component } = setup();
      const todos = [
        { done: false, id: 0, order: "20", text: "todo1" },
        { done: false, id: 1, order: "", text: "todo2" },
        { done: false, id: 2, order: null, text: "null todo" }
      ];

      const sanitizedTodos = [
        { done: false, id: 0, order: "20", text: "todo1" },
        { done: false, id: 1, order: null, text: "todo2" },
        { done: false, id: 2, order: null, text: "null todo" }
      ];

      component._updateTodos = jest.fn();

      component.onChangeTodos(todos);
      expect(component._updateTodos).toBeCalledWith(sanitizedTodos);
    });
  });

  describe("onAddTodos()", () => {
    it("adds new Todos to state and storage", () => {
      const { instance, component } = setup();

      const storedTodos = [
        { id: 1, done: false, order: null, text: "todo1" },
        { id: 2, done: false, order: null, text: "todo2" }
      ];
      instance.setState({ todos: storedTodos });

      const todos = [
        { done: false, order: null, text: "todo3" },
        { done: false, order: null, text: "todo4" }
      ];
      const expectedTodos = [
        { id: 0, done: false, order: null, text: "todo1" },
        { id: 1, done: false, order: null, text: "todo2" },
        { id: 2, done: false, order: null, text: "todo3" },
        { id: 3, done: false, order: null, text: "todo4" }
      ];

      component.onAddTodos(todos);
      expect(instance.state("todos")).toEqual(expectedTodos);
    });
  });

  describe("onClearDoneTodos()", () => {
    it("clear done todos", () => {
      const { instance, component } = setup();

      const storedTodos = [
        { id: 1, done: false, order: null, text: "todo1" },
        { id: 2, done: true, order: null, text: "todo2" }
      ];
      instance.setState({ todos: storedTodos });

      const expectedTodos = [
        { id: 1, done: false, order: null, text: "todo1" }
      ];

      component.onClearDoneTodos();
      expect(instance.state("todos")).toEqual(expectedTodos);
    });
  });
});
