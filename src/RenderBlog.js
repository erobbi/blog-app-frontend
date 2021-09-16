import {Link, useParams} from 'react-router-dom'
import { useState } from 'react'

function RenderBlog({ setBlogs, blogs, blog }) {
    const { id, title, description, content, likes, created_at, img_url = "https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png" } = blog
    const [newLikes, setNewLikes] = useState(likes)


    
    function increaseLikes () {
        fetch(`/blogs/${blog.id}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blog
        }),
      })
        .then((r) => r.json())
        .then((obj)=>setNewLikes(obj.likes))     
    }

    function decrementLikes () {
        fetch(`/blogs/${blog.id}/dislike`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blog
        }),
      })
        .then((r) => r.json())
        .then((obj)=>setNewLikes(obj.likes))     
    }

     let imgHeights = {};
     let images = [img_url];

     images.forEach((eachURL) => {
       let img = new Image();
       img.src = eachURL;
       img.onload = () => (imgHeights[eachURL] = img.height);
     });
     console.log({imgHeights})

    return (
      <div className="blog">
        <h1>Your Blogs:</h1>
        <div>
          <h2>{title}</h2>
          <Link to={`/blogs/${blog.id}`} activeClassName="active">
            {title}
          </Link>
          <h3>{description}</h3>
          <h4>{content}</h4>
          <div style={({ width: "50px" }, { height: "50px" })}>
            <img src={img_url} attr="image" />
          </div>
          <h4>
            Likes: {newLikes}
            <i
              onClick={increaseLikes}
              className="thumbs up icon"
              style={({ color: "blue" }, { padding: "20px" })}
            ></i>
            <i
              onClick={decrementLikes}
              className="thumbs down icon"
              style={({ color: "blue" }, { padding: "20px" })}
            ></i>
          </h4>
          <p>posted: {created_at}</p>
        </div>
      </div>
    );
}

export default RenderBlog