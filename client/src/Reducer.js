

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
    case "REGISTER":
      return action.username;
    case "LOGOUT":
      return "";
    default:
      return state;
  }
}
function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE_TODO":
      const newTodo = {
        id:action.id,
        title: action.title,
        description: action.description,
        author: action.author,
        dateCreated: Date.now(),
        completed: false,
        dateCompleted : null,
      };
      return [newTodo, ...state];
    case "FETCH_TODOS":
      return action.todos;
    case "TOGGLE_TODO":
      const toggleTodos = state.map((todos) =>
        todos.id === action.id
          ? { ...todos, completed: !todos.completed , dateCompleted:!todos.completed ? new Date().toLocaleString():null,
          }
          : todos
      );
      return toggleTodos;
      case "DELETE_TODO":
        const updateTodo= state.filter(todos => todos.id !== action.id);
        return updateTodo;
    default:
      return state;
  }
}
export default function appReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    todos: todoReducer(state.todos, action),
  };
}
