import { useContext, useState } from "react";
import { StateContext } from "./Context";
import { useResource } from "react-request-hook";


export default function CreateTodo({ handleAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {state, dispatch} = useContext(StateContext);
  const {user} = state;

  const [todo , CreateTodo ] = useResource(({ title, description, author, dateCreated }) => ({
    url: '/todos',
    method: 'post',
    data: { title, description, author, dateCreated }
    }))

  function handleCreate() {
    const newTodo = { 
      title,
      description,
      author: user,
      dateCreated: Date.now(),

    };
    CreateTodo(newTodo);
    dispatch({ type: 'CREATE_TODO', title, description, author: user })
    //handleAddTodo(newTodo);
  }

  function handleTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleDescription(evt) {
    setDescription(evt.target.value);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input type="text" value={title} onChange={handleTitle} name="create-title" id="create-title" />
      </div>
      <div>Description:
      <textarea value={description} onChange={handleDescription} />
      </div>
      
      <input type="submit" value="Create" onClick={handleCreate}/>
      
    </form>
  );
}
