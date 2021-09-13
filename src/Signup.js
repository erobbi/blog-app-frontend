import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Icon, Input } from "semantic-ui-react";

function Signup({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [img_url, setImg_url] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        password,
        password_confirmation: passwordConfirmation,
        birthdate,
        email,
        img_url,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          history.push("/");
        });
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
          placeholder="full name"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br />
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
      <div className="ui focus input">
        <input
          type="text"
          placeholder="avatar url"
          id="img_url"
          value={img_url}
          onChange={(e) => setImg_url(e.target.value)}
        />
      </div>

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
      <div className="ui focus input">
        <input
          type="password"
          placeholder="confirm password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>

      <br />
      <div>
        <div className="ui labeled input">
          <div className="ui label label">Birthdate:</div>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          <i aria-hidden="true" className="search icon"></i>
        </div>
      </div>
      <div>
        <div className="ui left icon input">
          <i aria-hidden="true" className="at icon"></i>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </div>
      </div>
      <br />
      <button type="submit" className="ui button">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
