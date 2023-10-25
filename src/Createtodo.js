import { useState } from "react";


export default function CreateTodo({ user, handleAddTodo }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  

  function handleCreate() {
    const newTodo = { 
      title,
      description,
      author: user,
      dateCreated: Date.now(),

    };
    handleAddTodo(newTodo);
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
