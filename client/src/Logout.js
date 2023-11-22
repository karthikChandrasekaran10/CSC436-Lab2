//Logout.js
export default function Logout({ user, dispatchUser }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatchUser({type:"LOGOUT"})
       }}
    >
      Logged in as: <b>{user.username}</b>
      <input type="submit" value="Logout" />
    </form>
  );
}
