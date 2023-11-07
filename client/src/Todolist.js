import Todo from "./Todo";
import { StateContext } from "./Context";
import { useContext } from "react";

export default function TodoList({handleDeleteTodo}) {
  const {state} = useContext(StateContext);
  return (
    <div>
      {state.todos.map((t) => (
        <div key={t.id}>
          <Todo {...t}  />
          <button  onClick={()=>handleDeleteTodo(t.id)}>Delete</button>      
        </div>
      ))}
    </div>
  );
}
