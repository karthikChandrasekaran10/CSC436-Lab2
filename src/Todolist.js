import Todo from "./Todo";

export default function TodoList({ todos = [], handleDeleteTodo}) {
  return (
    <div>
      {todos.map((t) => (
        <div key={t.id}>
          <Todo {...t}  />
          <button  onClick={()=>handleDeleteTodo(t.id)}>Delete</button>      
        </div>
      ))}
    </div>
  );
}
