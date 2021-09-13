import { NavLink } from 'react-router-dom';

function NavBar({ user, setUser }){

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }
    
    return (

        <nav className="navigation">
            <div className="side-logo">
                Logo Here
            </div>
            <NavLink exact to="/">
                <li>Home Page</li>
            </NavLink>
            <NavLink to="/blogs">
                <li>Blogs</li>
            </NavLink>
            { user ? 
            <NavLink to="/blogs/new" >
                <li>Add New Blog</li>
            </NavLink> 
             : null }
            { user ? 
            <NavLink to="/mypage" >
                <li>My Profile</li>
            </NavLink> 
            : null }
            { user ? null :
            <NavLink to="/signup" >
                <li>Sign Up</li>
            </NavLink>
            }
            { user ? 
                <h2>Welcome, {user.username}!</h2>
               :
            <NavLink to="/login" >
                <li>Log In</li>
            </NavLink>
            }
            { user ? 
            <NavLink to="/logout" >
                <li onClick={handleLogoutClick} >Log Out</li>
            </NavLink> 
            : null }
        </nav>

    )
}

export default NavBar;