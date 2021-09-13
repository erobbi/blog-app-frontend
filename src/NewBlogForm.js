import { useState } from "react";

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
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="content">Content:</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <br />
        <br />
        <label htmlFor="img_url">Add an image link for your article:</label>
        <input
          type="text"
          id="img_url"
          value={img_url}
          onChange={(e) => setImg_url(e.target.value)}
        />
        <br />
        <br />
        <br />
        <button type="submit">Submit Blog</button>
      </form>
    </div>
  );
}

export default NewBlogForm;
