import { atom } from "recoil";

export const todoListState = atom({
  key: "todoList",
  default: [],
});

export const todoInputState = atom({
  key: "todoInput",
  default: "",
});
