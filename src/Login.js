import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Login({ user, setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()
  
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
            r.json().then(setUser)
            history.push('/')      
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }
  
    return (
      <form onSubmit={handleSubmit}>
        {errors
          ? errors.map((err) => (
              <h3 style={{ color: "red" }} key={err}>
                {err}
              </h3>
            ))
          : null}

        <div className="ui focus input">
          <input
            type="text"
            placeholder="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <br />
        <div className="ui focus input">
          <input
            type="password"
            placeholder="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <br />
        <button type="submit" className="ui button">
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    );
  }

export default Login