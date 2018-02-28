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
      const todos = [{ done: false, id: 0, order: 10, text: "todo1" }];
      const json = '[{"done":false,"id":0,"order":10,"text":"todo1"}]';

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
        { done: false, id: 0, order: 10, text: "todo1" },
        { done: false, id: 1, order: 20, text: "todo2" },
        { done: false, id: 4, order: 10, text: "todo1" },
        { done: false, id: 2, order: 10, text: "todo3" }
      ];
      instance.setState({ todos: todos });

      component.onReorderTodos();

      expect(instance.state("todos")).toEqual([
        { done: false, id: 0, order: 10, text: "todo1" },
        { done: false, id: 4, order: 10, text: "todo1" },
        { done: false, id: 2, order: 10, text: "todo3" },
        { done: false, id: 1, order: 20, text: "todo2" }
      ]);
    });
  });

  describe("onChangeTodos()", () => {
    it("calls func to update", () => {
      const { component } = setup();
      const todos = [
        { done: false, id: 0, order: 20, text: "todo2" },
        { done: false, id: 1, order: 10, text: "todo1" }
      ];

      component._updateTodos = jest.fn();

      component.onChangeTodos(todos);
      expect(component._updateTodos).toBeCalledWith(todos);
    });
  });

  describe("onAddTodos()", () => {
    it("adds new Todos to state and storage", () => {
      const { component } = setup();
      const todos = [
        { done: false, order: 10, text: "todo1" },
        { done: false, order: 20, text: "todo2" }
      ];
      const storedTodos = [
        { id: 0, done: false, order: 10, text: "todo1" },
        { id: 1, done: false, order: 20, text: "todo2" }
      ];

      component._updateTodos = jest.fn();

      component.onAddTodos(todos);
      expect(component._updateTodos).toBeCalledWith(storedTodos);
    });
  });
});