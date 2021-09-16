import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import NewBlogForm from './NewBlogForm'
import BlogContainer from './BlogContainer'
import MyProfile from './MyProfile'
import Signup from './Signup'
import Login from './Login'
import HomePageRenderBlogs from './HomePageRenderBlogs';


function App() {
  const [blogs, setBlogs] = useState({})
  const [user, setUser] = useState({})
  // const [isFetched, setIsFetched] =useState(false)
  const [ allBlogs, setAllBlogs ] =useState([])

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) =>{ 
          setUser(user)
        }
          );
      }
    });
  }, []);
  
  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <div>
        <Switch>
          <Route exact path="/blogs/new">
            <NewBlogForm blogs={blogs} setBlogs={setBlogs} />
          </Route>
          <Route path="/mypage">
            <MyProfile user={user} blogs={blogs} setBlogs={setBlogs} setUser={setUser}/>
          </Route>
          <Route path="/blogs/:id">
            <BlogContainer blogs={blogs} user={user} />
          </Route>
          <Route exact path="/blogs">
            <BlogContainer blogs={blogs} user={user} />
          </Route>
          <Route path="/signup">
            <Signup setUser={setUser} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/allblogs/:id">
            <HomePageRenderBlogs user={user} />
          </Route>
          <Route exact path="/">
            <HomePage allBlogs={allBlogs}  setAllBlogs={setAllBlogs}  />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
