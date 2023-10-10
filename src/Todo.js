import { useState } from "react";

export default function Todo({title, description, author, dateCreated }) {
  const [completed, setCompleted] = useState(false);
  const [dateCompleted, setDateCompleted] = useState("");
  function handleChange(e) {
    setCompleted(e.target.checked);
    if (e.target.checked) {
      setDateCompleted(Date.now());
    } else {
      setDateCompleted(null);
    }
  }
  return (
    <div>
      <h3>{title}</h3>
      <div>{description}</div>
      <br />
      <p>
        Written by <b>{author}</b>
      </p>
      <div>
        <p>Date Created: {new Date(dateCreated).toLocaleString()}</p>
      </div>
      <label>Completed</label>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleChange}
      />
      { dateCompleted && (
        <p>Date Completed: {new Date(dateCompleted).toLocaleString()}</p>
      )}
    </div>
  );
}
