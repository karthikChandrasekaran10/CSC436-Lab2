// //Login.js
// import { useState, useEffect } from "react";
// import { useResource } from "react-request-hook";

// export default function Login({ dispatchUser }) {
//   const [username, setUsername] = useState("");
//   const [loginFailed, setLoginFailed] = useState(false);
//   const [password, setPassword] = useState("");

//   const [user, login] = useResource((username, password) => ({
//     url: "/auth/login",
//     method: "post",
//     data: { email: username, password },
//   }));
//   // useEffect(() => {
//   //   if (user && user.isLoading === false) {
//   //     if (user?.data?.user) {
//   //       setLoginFailed(false);
//   //       dispatchUser({ type: "LOGIN", username: user.data.user.email });
//   //     } else {
//   //       setLoginFailed(true);
//   //     }
//   //   }
//   // }, [user, dispatchUser]);
//   useEffect(() => {
//     if (user && user.isLoading === false && user.data) {
//       if (user.data.access_token) {
//         setLoginFailed(false);
//         localStorage.setItem("access_token", user.data.access_token);
//         dispatchUser({
//           type: "LOGIN",
//           username: username, 
//           access_token: user.data.access_token,
//         });
//       } else {
//         setLoginFailed(true);
//       }
//     }
//   }, [user, username, dispatchUser]);

//   function handleUsername(evt) {
//     setUsername(evt.target.value);
//     if (loginFailed) setLoginFailed(false);
//   }
//   function handlePassword(evt) {
//     setPassword(evt.target.value);
//     if (loginFailed) setLoginFailed(false);
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login(username, password);
//   };
//   return (
//     <>
//       {loginFailed && (
//         <span style={{ color: "red" }}>Invalid username or password</span>
//       )}
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="login-username">Username:</label>
//         <input
//           type="text"
//           name="login-username"
//           id="login-username"
//           value={username}
//           onChange={handleUsername}
//         />
//         <label htmlFor="login-password">Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={handlePassword}
//           name="login-username"
//           id="login-username"
//         />
//         <input type="submit" value="Login" disabled={username.length === 0} />
//       </form>
//     </>
//   );
// }
import { useState, useEffect } from "react";
import { useResource } from "react-request-hook";
export default function Login({ dispatchUser }) {
  const [username, setUsername] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");

  const [user, login] = useResource((username, password) => ({
    url: "/auth/login",
    method: "post",
    data: { username, password },
  }));

  // useEffect(() => {
  //   if (user) {
  //     if (user?.data?.user) {
  //       setLoginFailed(false); 
  //       dispatchUser({ type: "LOGIN", username: user.data.user.email });
  //     } else {
  //       setLoginFailed(true);
  //     }
  //   }
  // }, [user]);

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        setLoginFailed(true);
      } else {
        setLoginFailed(false);
        dispatchUser({
          type: "LOGIN",
          username: user.data.username,
          access_token: user.data.access_token,
        });
      }
    }
  }, [user]);

  function handleUsername(evt) {
    setUsername(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <>
      {loginFailed && (
        <span style={{ color: "red" }}>Invalid username or password</span>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // setUser(username);
          login(username, password);
          //dispatchUser({ type: "LOGIN", username });
        }}
      >
        <label htmlFor="login-username">Username:</label>
        <input
          type="text"
          name="login-username"
          id="login-username"
          value={username}
          onChange={handleUsername}
        />
        <label htmlFor="login-password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePassword}
          name="login-username"
          id="login-username"
        />
        ;
        <input type="submit" value="Login" disabled={username.length === 0} />
      </form>
    </>
  );
}