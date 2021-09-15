
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage({ allBlogs, setAllBlogs }) {
  const [ isFetched, setIsFetched ] = useState(false)

  useEffect(() => {
    fetch("/blogs")
      .then((r) => r.json())
      .then(obj => {
        setAllBlogs(obj);
        setIsFetched(true)
      })
  }, []);
  
 console.log(allBlogs)

  return (
    <main className="blog">
      <h2>All Blogs</h2>
      {allBlogs.map((blog) => {
      
        return (
          <div key={blog.id} >
            <h3>
              <Link to={`/allblogs/${blog.id}`}>{blog.title}</Link>
            </h3>
            <p>Description : {blog.description}</p>
            <small>
              written by : {blog.user.username}  •  posted : {blog.created_at.slice(0,10)} 
            </small>
            <div className="ui divider" />
          </div>
         
        );
      })}
    </main>
  );
}

export default HomePage;