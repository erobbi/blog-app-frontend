import { useState } from 'react'
import UsernameUpdater from './Updaters/UsernameUpdater';
import AvatarUpdater from './Updaters/AvatarUpdater';
import DateUpdater from './Updaters/DateUpdater';
import EmailUpdater from './Updaters/EmailUpdater';

function MyProfile({ user, setUser }) {

    const [showUUpdater, setShowUUpdater] = useState(false);
    const [showAUpdater, setShowAUpdater] = useState(false);
    const [showDUpdater, setShowDUpdater] = useState(false);
    const [showEUpdater, setShowEUpdater] = useState(false);

    const totalBlogs = user.blogs && user.blogs.length
    // let totalLikes = 0

    function handleDeleteClick() {
        fetch(`users/${user.id}`, {
          method: "DELETE",
        }).then((r) => r.json());
      }
    
    
    return(
          <div className="blog">
            <div>
                <h1> My Profile </h1>
                <h2>Name: {user.username}</h2>
                  <button onClick={() => setShowUUpdater(!showUUpdater)}>Update Username</button>
                  {showUUpdater ? <UsernameUpdater user={user} setUser={setUser} /> : null }
                  <h3>Avatar: </h3>
                  <img src={user.img_url} className="avatar"/>
                  <br/>
                  <button onClick={() => setShowAUpdater(!showAUpdater)}>Update Avatar</button>
                  {showAUpdater ? <AvatarUpdater user={user} setUser={setUser} /> : null }
                  <h3>DOB: {user.birthdate}</h3>
                  <button onClick={() => setShowDUpdater(!showDUpdater)}>Update DOB</button>
                  {showDUpdater ? <DateUpdater user={user} setUser={setUser} /> : null }
                  <h3>email: {user.email}</h3>
                  <button onClick={() => setShowEUpdater(!showEUpdater)}>Update Email</button>
                  {showEUpdater ? <EmailUpdater user={user} setUser={setUser} /> : null }
                <button onClick={handleDeleteClick}>Delete Profile</button>
            </div>
            <br/>
            <div>
                <h2>Your Stats</h2>
                <h3>Total Blogs Posted: {totalBlogs}</h3>
                {/* <h3>Total Likes Recieved: {totalLikes}</h3> */}
                <br/>
            </div>
          </div>
    )
}

export default MyProfile