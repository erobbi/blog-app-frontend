import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

function BlogContainer({user}) {
    const [activeBlog, setActiveBlog] = useState({})
    let blogId = useParams();
    console.log(blogId);

    if (blogId = {}) {
      blogId.id = 1
    }
    useEffect(() => {
      fetch(`/blogs/${blogId.id}`).then((response) => {
        if (response.ok) {
          response.json().then((res) => {
            setActiveBlog(res);
            console.log({activeBlog})
          });
        }
      });
    }, []);


            // const [newLikes, setNewLikes] = useState(likes);

            // function increaseLikes() {
            //   fetch(`/blogs/${blog.id}/like`, {
            //     method: "PATCH",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //       blog,
            //     }),
            //   })
            //     .then((r) => r.json())
            //     .then((obj) => setNewLikes(obj.likes));
            // }

            // function decrementLikes() {
            //   fetch(`/blogs/${blog.id}/dislike`, {
            //     method: "PATCH",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //       blog,
            //     }),
            //   })
            //     .then((r) => r.json())
            //     .then((obj) => setNewLikes(obj.likes));
            // }


  return ( 
      <li>
      <h1>BlogContainer</h1>
      {/* could add an loading ternary thing here, if load would take awhile (but this will be a quick fetch) */}
            <div>
                <h2>{activeBlog.title}</h2> 
                 <h3>{activeBlog.description}</h3>
                <h4>{activeBlog.content}</h4> 
                <div style={{width: "50px"}, {height: "50px"}}> 
                   <img src={activeBlog.img_url} attr="image" />   
                </div>
                {/* <h4>Likes: {newLikes} 
                    <i onClick={increaseLikes} className="thumbs up icon" style={{color: "blue"}, {padding: "20px"}}></i>
                    <i onClick={decrementLikes} className="thumbs down icon" style={{color: "blue"}, {padding: "20px"}}></i>
                </h4> */}
               {/* <p>posted: {activeBlog.created_at}</p>  */}
            </div>
        </li>
    )
}

export default BlogContainer