import BlogContainerRenderBlog from "./BlogContainerRenderBlog";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function BlogContainer({ user, setUser, blogs }) {
  const [activeBlog, setActiveBlog] = useState({});

    useEffect(() => {
      fetch("/me").then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            setUser(user);
          });
        }
      });
    }, []);

  let blogId = useParams();
  useEffect(() => {
    fetch(`/blogs/${blogId.id}`).then((response) => {
      if (response.ok) {
        response.json().then((res) => {
          setActiveBlog(res);
        });
      }
    });
  }, []);

  function RenderMyBlogs({ blogs }) {
    return (
      <main className="blog">
        <h2>My Blogs</h2>
        {blogs.map((eachBlog) => (
          <div>
            <h3>
              <Link to={`/blogs/${eachBlog.id}`}> {eachBlog.title} </Link>
            </h3>
            <p>Description: {eachBlog.description}</p>
            <div className="ui divider" />
          </div>
        ))}
      </main>
    );
  }

  return (
    <div>
      {blogId.id ? (
        <BlogContainerRenderBlog />
      ) : (
        <RenderMyBlogs key={user.id} blogs={user.blogs} />
      )}
    </div>
  );
}

export default BlogContainer;
