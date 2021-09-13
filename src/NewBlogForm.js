import { useState } from "react";
import { Button } from "semantic-ui-react";

function NewBlogForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img_url, setImg_url] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        img_url,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(console.log("blog submitted"));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      <h2>Draft your blog here!</h2>

      <form class="w-full max-w-sm" onSubmit={handleSubmit}>
        <div class="ui huge icon input">
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
        <div>
          <div class="ui large icon input">
            <input 
            type="text" 
            placeholder="Content..." />
            <i aria-hidden="true"
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            ></i>
          </div>
        </div>
        <br />
        <br />
        <div>
          <div class="ui mini icon input">
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
        <button type="submit" class="ui button">
          Submit Blog!
        </button>
      </form>
    </div>
  );
}

export default NewBlogForm;
