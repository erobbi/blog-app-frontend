import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CommentsContainer from './CommentsContainer'

// const initialState = {
//   blog: {},
//   error: {},
//   status: "pending",
// };

function HomePageRenderBlogs({ allBlogs, user }) {
//   const [{ blog, error, status }, setState] = useState(initialState);
  const { id } = useParams();
//   const [ isLoaded, setIsLoaded ] = useState(false)

// console.log(status)

//   useEffect(() => {
//     setState(initialState);
//     fetch(`/blogs/${id}`).then((r) => {
//       if (r.ok) {
//         r.json().then((blog) => {
//           setState({ blog, error: null, status: "resolved" })
//           setIsLoaded(true)
//         }
//         );
//       } else {
//         r.json().then((message) =>
//           setState({ blog: null, error: message.error, status: "rejected" })
//         );
//       }
//     });
//   }, [id]);

//   if (status === "pending") return <h1>Loading...</h1>;
// if (isLoaded) {
//     return <h1>Loading...</h1>;
// } 
    const blog = allBlogs.find(blog => blog.id == id)
    const { title, img_url, description, created_at, content, likes } = blog;
    const [newLikes, setNewLikes] = useState(likes)
    const date = [...created_at].slice(0,10)

      function increaseLikes () {
        fetch(`/blogs/${id}/like`, {
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
        fetch(`/blogs/${id}/dislike`, {
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

  return ( 
      <div className="blog">
           <article>
             <h1>{title}</h1>
             <div className="ui divider" />
             <small>
               <p>{description}</p>
               <p className="ui left aligned container">
                 Posted on {date} 
                 {/* •  */}
               </p>
               <p className="ui left aligned container">
                 <em> Written by {blog.user.username} </em>
               </p>
             </small>
             <div className="ui divider" />
             {/* <div className={{height:"50px"}, {width: "50px"}}>
                 <img src={img_url} alt="image" />
             </div> */}
             <p>{content}</p>
             <div className="ui divider" />
             <h5>Likes: {newLikes} 
                           <i onClick={increaseLikes} className="thumbs up icon" style={{padding: "20px"}}></i>
                           <i onClick={decrementLikes} className="thumbs down icon" style={{padding: "20px"}}></i>
            </h5> 
           <div className="ui divider" />
           <CommentsContainer user={user} blog={blog}/>
           <div className="ui divider" />
           <Link to={'/'}>
               <button>Back to List</button>
           </Link>
           </article> 
        </div>
     );
}

export default HomePageRenderBlogs;
