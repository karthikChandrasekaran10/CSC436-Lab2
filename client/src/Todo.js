import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "./Context";
export default function Todo({title, description, author, dateCreated }) {

  const {secondaryColor} = useContext(ThemeContext);
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
      <h3 style={{color: secondaryColor}}>{title}</h3>
      <p><b>{description}</b></p>
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
