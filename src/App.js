import { useReducer } from "react";
import UserBar from "./Userbar";
import CreateTodo from "./Createtodo";
import TodoList from "./Todolist";
import appReducer from "./Reducer";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });
  const {user,todos}= state;

  const handleAddTodo = (newTodo) => {
    dispatch({ type: "CREATE_TODO", ...newTodo });
  };
  const handleDeleteTodo= (todos)=>{
    dispatch({type:"DELETE_TODO",todos});
  }
  const handleToggleTodo = (id) => {
  dispatch({ type: "TOGGLE_TODO", id });
};


  let content;
  if (state.user) {
    content = (
      <>
        <CreateTodo user={user} handleAddTodo={handleAddTodo} />
        <TodoList todos={todos} handleAddTodo={handleAddTodo} 
        handleDeleteTodo ={handleDeleteTodo}
        handleToggleTodo={handleToggleTodo} />
      </>
    );
  }

  return (
    <div>
      <UserBar user={user} dispatchUser={dispatch} />
      {content}
    </div>
  );
}

export default App;
