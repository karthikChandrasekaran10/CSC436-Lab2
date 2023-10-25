import { useState } from "react";

export default function Todo({title, description, author, dateCreated }) {
  const [completed, setCompleted] = useState(false);
  const [dateCompleted, setDateCompleted] = useState("");

  const handleToggleComplete = () => {
    setCompleted(!completed);
    if (!completed) {
      setDateCompleted(Date.now());
    } else {
      setDateCompleted(null);
    }
  };
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
      <label> Completed </label>
      <button onClick={handleToggleComplete}>
        {completed ? "Incomplete" : "Done"}
      </button>
      { dateCompleted && (
        <p>Date Completed: {new Date(dateCompleted).toLocaleString()}</p>
      )}
    </div>
  );
}
