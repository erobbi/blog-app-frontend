import RenderBlog from "./RenderBlog";
import BlogContainerRenderBlog from "./BlogContainerRenderBlog";
import CommentsContainer from "./CommentsContainer";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function BlogContainer({ user, blogs, setBlogs }) {
  const [activeBlog, setActiveBlog] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  let blogId = useParams();

  useEffect(() => {
    fetch(`/blogs/${blogId.id}`).then((response) => {
      if (response.ok) {
        response.json().then((res) => {
          setActiveBlog(res);
          setIsLoaded(true);
        });
      }
    });
  }, []);

  const renderMyBlogs =
    user.blogs &&
    user.blogs.map((blog) => (
      <RenderBlog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
    ));

  return (
    <div>
      {blogId.id ? (<BlogContainerRenderBlog />) : <div>{renderMyBlogs}</div>}
    </div>
  );
}

export default BlogContainer;
