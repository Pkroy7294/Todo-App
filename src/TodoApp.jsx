import { useState } from "react";

export function TodoApp() {

  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (!task.trim()) return;

    if (editId) {
      setTodos(todos.map(todo =>
        todo.id === editId
          ? { ...todo, text: task }
          : todo
      ));
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        text: task,
        completed: false
      };

      setTodos([...todos, newTodo]);
    }

    setTask("");
  }

  function handleDelete(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function toggleComplete(id) {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  }

  function handleEdit(todo) {
    setTask(todo.text);
    setEditId(todo.id);
  }

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Todo App</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      {todos.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul>
          {todos.map(todo => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.text} {" "}

              <button onClick={() => toggleComplete(todo.id)}>
                ✔
              </button>

              <button onClick={() => handleEdit(todo)}>
                Edit
              </button>

              <button onClick={() => handleDelete(todo.id)}>
                Delete
              </button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}