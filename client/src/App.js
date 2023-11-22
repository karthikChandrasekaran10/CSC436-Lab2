//App.js
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

  // const [todoResponse, getTodos] = useResource(() => ({
  //   url: "/todos",
  //   method: "get",
  // }));

  // useEffect(getTodos,[]);

  // useEffect(()=>{
  //   if(todoResponse && todoResponse.data){
  //     dispatch({type:"FETCH_TODOS",todos:todoResponse.data.reverse()});
  //   }
  // },[todoResponse]);
  const [todoResponse, getTodos] = useResource(() => ({
    url: "/todos",
    method: "get",
    headers: { Authorization: `${state?.user?.access_token}` },
  }));

  // useEffect(() => {
  //   if (state?.user?.access_token) {
  //     getTodos();
  //   }
  // }, [state?.user?.access_token]);
  useEffect(() => {
    getTodos();
  }, [state?.user?.access_token]);
  useEffect(() => {
    if (todoResponse && todoResponse.isLoading === false && todoResponse.data) {
      dispatch({
        type: "FETCH_TODOS",
        todos: todoResponse.data.todos.reverse(),
      });
    }
  }, [todoResponse]);
  useEffect(() => {
    if (user) {
      document.title = `${user.username}’s Blog`;
    } else {
      document.title = "Blog";
    }
  }, [user]);
  let content;
  if (state.user) {
    content = (
      <>
        <CreateTodo />
        <TodoList />
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
