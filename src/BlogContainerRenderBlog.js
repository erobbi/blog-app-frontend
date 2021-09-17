import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";

function BlogContainerRenderBlog({ user }) {
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`/blogs/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((blog) => {
          setBlog(blog);
          setIsLoaded(true);
        });
      }
    });
  }, [id]);

  const { title, img_url, description, created_at, content, likes } = blog;
  const [newLikes, setNewLikes] = useState(likes);

  const [isEditMode, setIsEditMode] = useState(false);
  function handleEditClick() {
    setIsEditMode(!isEditMode);
    console.log({ isEditMode });
  }

  function RenderMyBlog() {
    return (
      <article>
        <h1>{title}</h1>
        <div className="ui divider" />
        <small>
          <h4>{description}</h4>
          <p className="ui left aligned container">
            Posted on {[...created_at].slice(0, 10)}
          </p>
          <p className="ui left aligned container">
            <em>
              {" "}
              Written by{" "}
              <span style={{ fontWeight: "bold" }}>{blog.user.username}</span>
            </em>
          </p>
        </small>
        <div className="ui divider" />
        <div className="image">
          <img
            src={img_url}
            alt="image"
            style={({ height: "60%" }, { width: "60%" })}
          />
        </div>
        <p>{content}</p>
        <div className="ui divider" />
        <h5>Likes: {likes}</h5>
        <div className="ui divider" />
        <br />
        <button onClick={handleEditClick} className="blog-button">
          Edit Blog
        </button>
        <Link to={"/blogs"}>
          <button className="blog-button">Back to My Blogs</button>
        </Link>
      </article>
    );
  }

  function RenderEditMode() {
    const [title, setTitle] = useState(blog.title);
    const [description, setDescription] = useState(blog.description);
    const [content, setContent] = useState(blog.content);
    const [img_url, setImg_url] = useState(blog.img_url);

    function handleSubmit(e) {
      e.preventDefault();
      fetch(`/blogs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          content,
          img_url,
          likes: newLikes,
        }),
      })
        .then((r) => r.json())
        .then((blog) => { 
          setBlog( blog )
          setIsEditMode(!isEditMode)
        })
    }

    return (
      <div>
        <h2>Edit Mode</h2>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="ui huge icon input">
            <input
              type="text"
              placeholder="Title here..."
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <i aria-hidden="true"></i>
          </div>
          <br />
          <br />
          <div className="ui large icon input">
            <input
              type="text"
              placeholder="Subtitle here..."
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <i aria-hidden="true"></i>
          </div>
          <br />
          <br />
          <textarea
            rows="10"
            type="textarea"
            placeholder="Content..."
            aria-hidden="true"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <br />
          <br />
          <br />
          <div>
            <div className="ui mini icon input">
              <input
                type="text"
                placeholder="optional image link..."
                id="img_url"
                value={img_url}
                onChange={(e) => setImg_url(e.target.value)}
              />
              <i aria-hidden="true"></i>
            </div>
            <br />
          </div>
          <br />
          <br />
        <button onClick={handleSubmit} className="blog-button">
          Done Editing
        </button>
        </form>
      </div>
    );
  }

  return (
    <>
      {isLoaded ? (
        <div className="blog">
          {isEditMode ? <RenderEditMode /> : <RenderMyBlog />}
        </div>
      ) : (
        <div className="blog">
          <h1 style={{ color: "red" }}>
            Please Signup or Login to see blog details.
          </h1>
        </div>
      )}
    </>
  );
}

export default BlogContainerRenderBlog;
