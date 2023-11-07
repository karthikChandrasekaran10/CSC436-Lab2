import { useReducer, useEffect, useState } from "react";
import UserBar from "./Userbar";
import CreateTodo from "./Createtodo";
import TodoList from "./Todolist";
import appReducer from "./Reducer";
import Header from "./Header";
import { ThemeContext, StateContext } from "./Context";
import ChangeTheme from "./ChangeTheme";
import { useResource } from "react-request-hook";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todos: [],
  });

  const { user, todos } = state;

  const [theme, setTheme] = useState({
    primaryColor: "orange",
    secondaryColor: "purple",
  });

  useEffect(() => {
    if (user) {
      document.title = `${user}'s Todos`;
    } else {
      document.title = "Todos";
    }
  }, [user]);

  // useEffect(() => {
  //   fetch("/api/todos")
  //     .then((result) => result.json())
  //     .then((todos) => dispatch({ type: "FETCH_TODO", todos }));
  // }, []);

  const [todoResponse, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
  }));
  
  useEffect(getTodos,[]);
  
  useEffect(()=>{
    if(todoResponse && todoResponse.data){
      dispatch({type:"FETCH_TODOS",todos:todoResponse.data.reverse()});
    }
  },[todoResponse]);

  const handleAddTodo = (newTodo) => {
    dispatch({ type: "CREATE_TODO", ...newTodo });
  };

  const handleDeleteTodo = (todos) => {
    dispatch({ type: "DELETE_TODO", todos });
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };

  let content;
  if (state.user) {
    content = (
      <>
        <CreateTodo handleAddTodo={handleAddTodo} />
        <TodoList
          handleAddTodo={handleAddTodo}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleTodo={handleToggleTodo}
        />
      </>
    );
  }

  return (
    <div>
      <StateContext.Provider value={{ state, dispatch }}>
        <ThemeContext.Provider value={theme}>
          <Header text="My Todos" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <UserBar />
          {content}
        </ThemeContext.Provider>
      </StateContext.Provider>
    </div>
  );
}

export default App;
