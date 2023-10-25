import { v4 as uuidv4 } from 'uuid';

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
        id: uuidv4(),
        title: action.title,
        content: action.description,
        author: action.author,
        dateCreated: Date.now(),
    
      };
    return [newTodo, ...state];
    case "TOGGLE_TODO":
        const toggleTodos = state.map(todos => 
            todos.id === action.id ? {...todos, completed :!todos.completed} :todos
            );
        return toggleTodos;    
    case "DELETE_TODO":
        const updateTodo= state.filter(todos => todos.id !== action.todos);
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
