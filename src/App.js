import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import NewBlogForm from './NewBlogForm'
import BlogContainer from './BlogContainer'
import MyProfile from './MyProfile'
import Signup from './Signup'
import Login from './Login'


function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const history = useHistory()

  return (
    <div className="App">
       <NavBar user={user} setUser={setUser} />
      <div>
        <Switch>
          <Route exact path="/blogs/new">
            <NewBlogForm />
          </Route>
          <Route exact path="/mypage">
            <MyProfile />
          </Route>
          <Route exact path="/blogs">
            <BlogContainer blogs={blogs}/>
          </Route>
          <Route exact path="/signup">
            <Signup setUser={setUser}/>
          </Route>
          <Route exact path="/login">
            <Login setUser={setUser}/>
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>        
        </Switch>
      </div>
    </div>
  );
}

export default App;
