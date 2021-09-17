import potato from "./images/potato.png";
import { NavLink } from "react-router-dom";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser({});
      }
    });
  }

  return (
    <nav className='navigation'>
      <div className='side-logo'>
        <img src={potato}></img>
      </div>
      <NavLink exact to='/'>
        <li>Home Page</li>
      </NavLink>
      

      {Object.keys(user).length > 0 ? (
        <NavLink to='/blogs'>
          <li>My Blogs</li>
        </NavLink>
      ) : null}

      {Object.keys(user).length > 0 ? (
        <NavLink to='/blogs/new'>
          <li>Add New Blog</li>
        </NavLink>
      ) : null}

      {Object.keys(user).length > 0 ? (
        <NavLink to='/mypage'>
          <li>My Profile</li>
        </NavLink>
      ) : null}

      {Object.keys(user).length <= 0 ? (
        <NavLink to='/signup'>
          <li>Sign Up</li>
        </NavLink>
      ) : null }

      {Object.keys(user).length <= 0 ? (
        <NavLink to='/login'>
          <li>Log In</li>
        </NavLink>
      ) : (
        null
      )}

      {Object.keys(user).length > 0 ? (<NavLink to='/mypage'>
          <li className="userNav">
            <h2>Welcome, {user.username}!</h2>
          </li>
        </NavLink> ) : null }

      {Object.keys(user).length > 0 ? (
        <NavLink to='/logout'>
          <li onClick={handleLogoutClick}>Log Out</li>
        </NavLink>
      ) : null}
    </nav>
  );
}

export default NavBar;
