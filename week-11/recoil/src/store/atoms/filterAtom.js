import { selector } from "recoil";
import { todoListState } from "./todoAtom";

export const filteredTodoList = selector({
  key: "filteredTodoList",
  get: ({ get }) => {
    const list = get(todoListState);
    return list;
  },
});
