import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CommentsContainer from './CommentsContainer'

function HomePageRenderBlogs({ user }) {
  const [ blog, setBlog ] = useState({})
  const { id } = useParams();
  const [ isLoaded, setIsLoaded ] = useState(false)
  const [ errors, setErrors ] = useState([])

useEffect(() => {
  fetch(`/blogs/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((blog) => {
          setBlog(blog)
          setIsLoaded(true)
        }
        );
      // } else {
      //   r.json().then(setErrors);
      }
    });
  }, [id]);

  // useEffect(() => {
  //   setState(initialState);
  //   fetch(`/blogs/${id}`).then((r) => {
  //     if (r.ok) {
  //       r.json().then((blog) => {
  //         console.log(blog)
        
  //         setState({ blog, error: null, status: "resolved" })
  //         // setIsLoaded(true)
  //       }
  //       );
  //     } else {
  //       r.json().then((message) =>
  //         setState({ blog: null, error: message.error, status: "rejected" })
  //       );
  //     }
  //   });
  // }, []);
//   if (status === "pending") return <h1>Loading...</h1>;
    // if (!isLoaded) {
    //     return <div className="blog"><h1 style={{color: "red"}}>Please Signup or  Login to see blog details. </h1></div>;
    // } 
    // const blog = allBlogs.find(blog => blog.id == id)
    const { title, img_url, description, created_at, content, likes } = blog;
    const [newLikes, setNewLikes] = useState(likes)
   
    // const date = [...created_at].slice(0,10)
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
    <>
    {/* {errors.length > 0? errors.map((error) => <p>{error}</p>) : null} */}
    { isLoaded ? 
      <div className="blog">
           <article>
             <h1>{title}</h1>
             <div className="ui divider" />
             <small>
               <h4>{description}</h4>
               <p className="ui left aligned container">
                 Posted on {[...created_at].slice(0,10)} 
                 {/* •  */}
               </p>
               <p className="ui left aligned container">
                 <em> Written by <span style={{fontWeight: "bold"}}>{blog.user.username}</span></em>
               </p>
             </small>
             <div className="ui divider" />
             <div className="image">
                 <img src={img_url} alt="image" style={{height:"60%"}, {width: "60%"}}/>
             </div>
             <p>{content}</p>
             <div className="ui divider" />
             { newLikes === undefined ? <h5>Likes: {likes}</h5> : <h5>Likes: {newLikes}</h5> } 
                           <i onClick={increaseLikes} className="thumbs up icon" style={ {padding:"20px", cursor: "pointer", color:"blue"}}></i>
                           <i onClick={decrementLikes} className="thumbs down icon" style={ {padding:"20px", cursor: "pointer", color:"blue"}} ></i>
           <div className="ui divider" />
           <CommentsContainer user={user} blog={blog}/>
           <div className="ui divider" />
           <Link to={'/'}>
               <button className="blog-button">Back to List</button>
           </Link>
           </article> 
        </div> 
        :
        <div className="blog"><h1 style={{color: "red"}}>Please Signup or Login to see blog details. </h1></div>
        }
        </>
     );
}

export default HomePageRenderBlogs;
