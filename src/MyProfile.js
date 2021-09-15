import RenderBlog from './RenderBlog'
import { useState } from 'react'
import ProfileUpdater from './ProfileUpdater'

function MyProfile({ user, blogs, setBlogs, setUser }) {

    const [showUpdater, setShowUpdater] = useState(false);

    console.log(user)
    const renderMyBlogs = user.blogs && user.blogs.map((blog)=> 
        <RenderBlog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />)
    const totalBlogs = user.blogs && user.blogs.length
    // let totalLikes = 0

    function handleDeleteClick() {
        fetch("/users/destroy", {
          method: "DELETE",
        })
          .then((r) => r.json());
      }
    
    
    return(
          <div className="ui-card">
            <div>
                <h1> My Profile </h1>
                <h2>Name: {user.username}</h2>
                <h3>Avatar: {user.img_url}</h3>
                <h3>DOB: {user.birthdate}</h3>
                <h3>email: {user.email}</h3>
                <button onClick={e => setShowUpdater(!showUpdater)}>Modify Account</button>
                {!showUpdater ? <ProfileUpdater user={user} setUser={setUser} /> : null}
                <button onClick={handleDeleteClick}>Delete Profile</button>
            </div>
            <br/>
            <div>
                <h2>Your Stats</h2>
                <h3>Total Blogs Posted: {totalBlogs}</h3>
                {/* <h3>Total Likes Recieved: {totalLikes}</h3> */}
                <br/>
                <h2>Your Blogs:</h2>
                <ul>{renderMyBlogs}</ul>
            </div>
          </div>
    )
}

export default MyProfile