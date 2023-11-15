// TodoList.js
import Todo from "./Todo";
import { useContext } from "react";
import { StateContext } from "./Context";
import { useResource } from "react-request-hook";

export default function TodoList() {
  const { state, dispatch } = useContext(StateContext);
  const {todos} = state;

  const [deleteResponse, deleteTodo] = useResource((todoId) => ({
    url: `/todos/${todoId}`,
    method: 'delete',
  }));

  const [toggleResponse, toggleTodo] = useResource((todoId,completed, dateCompleted) => ({
    url: `/todos/${todoId}`,
    method: 'patch',
    data: {completed, dateCompleted},
  }));

  

  const handleDeleteTodo = (id) => {
      const todoDelete = todos.find((item) => item.id ===id);
      if(todoDelete){
        deleteTodo(todoDelete.id);
        dispatch({ type: 'DELETE_TODO', id: todoDelete.id });
      }
    };

    const handleToggleTodo = (id) => {
      const todoToggle = todos.find((item) => item.id ===id);
      if (todoToggle) {
        dispatch({ type: 'TOGGLE_TODO', id });
      }
      toggleTodo({
        id: todoToggle.id,
        completed: !todoToggle.completed,
        dateCompleted:!todoToggle.completed ? new Date().toLocaleString():null,
      });
    };

  return (
    <div>
      {todos.map((t) => (
        <div key={t.id}>
          <Todo {...t} toggleTodo={() => handleToggleTodo(t.id)} />
          <button onClick={() => handleDeleteTodo(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
