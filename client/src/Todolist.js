import Todo from "./Todo";
import { StateContext } from "./Context";
import { useContext } from "react";

export default function TodoList({handleDeleteTodo}) {
  const {state} = useContext(StateContext);

  // const [response, deleteTodo] = useResource(todoId => ({
  //   url: '/todos/${todoId}',
  //   method: 'delete',
  // }));

  // useEffect(() => {
  //   if (response && response.data && response.error === null) {
  //     // Dispatch an action to remove the todo from local state
  //     dispatch({ type: 'DELETE_TODO', id: response.data.id });
  //   }
  // }, [response, dispatch]);

  // const handleDeleteTodo = (todoId) => {
  //   deleteTodo(todoId);
  // };

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
