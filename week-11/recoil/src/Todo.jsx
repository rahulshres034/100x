import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoInputState, todoListState } from "./store/atoms/todoAtom";
import { filteredTodoList } from "./store/atoms/filterAtom";

const Todo = () => {
  const [todolist, setTodoList] = useRecoilState(todoListState);
  const [todoInput, setTodoInput] = useRecoilState(todoInputState);
  const filteredList = useRecoilValue(filteredTodoList);

  const addTodo = () => {
    if (todoInput.trim()) {
      setTodoList([
        ...todolist,
        {
          id: Date.now(),
          text: todoInput,
          completed: false,
        },
      ]);
      setTodoInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodoList((list) =>
      list.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodoList((list) => list.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Recoil Practice</h1>
      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {filteredList.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>Total Todo: {filteredList.length}</p>
    </div>
  );
};

export default Todo;
