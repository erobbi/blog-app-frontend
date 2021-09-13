import { useState } from 'react'

function Signup({ setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [email, setEmail] = useState("");
    const [img_url, setImg_url] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([])
  
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
                r.json().then(setUser);
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
        
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="img_url">Img URL:</label>
        <input
          type="text"
          id="img_url"
          value={img_url}
          onChange={(e) => setImg_url(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password_confirmation">Confirm Password:</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
         <label htmlFor="img_url">Birthdate:</label>
        <input
          type="date"
          id="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
        />
         <label htmlFor="email">Email :</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    );
  }

  export default Signup
