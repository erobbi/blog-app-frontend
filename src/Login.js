import { useState, useEffect } from 'react'

function Login({ user, setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch("/me").then((response) => {
          if (response.ok) {
            response.json().then((user) => {
              setUser(user)
              if (user) {
                return <h2>Welcome, {user.username}!</h2>;
              } else {
                return <Login setUser={setUser} />;
              }
            });
          }
        });
    }, []);
  
    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => setUser(user));
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }
  
    return (
      <form onSubmit={handleSubmit}>
       { errors ? 
         errors.map((err) => (
          <h3 style={{color: "red"}} key={err}>{err}</h3>
        )) : null }
  
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
  
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       
        <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
      </form>
    );
  }

export default Login