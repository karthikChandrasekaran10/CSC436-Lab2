import Todo from "./Todo";
import { v4 as uuidv4 } from 'uuid';
export default function TodoList({ todos = [], handleDeleteTodo, handleToggleTodo}) {
  return (
    <div>
      {todos.map((t, i) => (
        <div key={uuidv4()}>
        
          <Todo {...t}  />
          <button  onClick={()=>handleDeleteTodo(t.id)}>Delete</button>      
        </div>
      ))}
    </div>
  );
}
