import { useState } from "react";
import { useHistory } from "react-router-dom"

function NewBlogForm({ blogs, setBlogs }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [img_url, setImg_url] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        content,
        img_url,
        likes: 0,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newBlog) => {
          history.push('/mypage')
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <main className="blog">
      <h2>Draft your blog here!</h2>

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
        <button type="submit" className="ui button">
          Submit Blog!
        </button>
      </form>
    </main>
  );
}

export default NewBlogForm;
