import { useState } from "react";
import UserBar from "./Userbar";
import CreateTodo from "./Createtodo";
import TodoList from "./Todolist";

function App() {
  const [user, setUser] = useState("");
  const initialTodos = [
  ];
  const [todos, setTodos]= useState(initialTodos);

  const handleAddTodo = (newTodo) =>{
    setTodos([newTodo, ...todos])
  };
  let content;
  if(user){
    content=(<CreateTodo user={user} handleAddTodo={handleAddTodo} />,
      <TodoList todos={todos} handleAddTodo={handleAddTodo}/> )
  }

  return (
    <div>
      <UserBar user={user} setUser={setUser} />
      {content}
     
    </div>
  );
}
export default App;
