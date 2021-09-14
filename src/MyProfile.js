import RenderBlog from './RenderBlog'

function MyProfile({ user }) {
    console.log(user)
    const { id, username, name, img_url, email, birthdate } = user
    const renderMyBlogs = user.blogs.map((blog)=>
        <RenderBlog key={blog.id} blog={blog} />)
    const totalBlogs = user.blogs.length
    let totalLikes = 0
    user.blogs.map((blog) => totalLikes = blog.likes + totalLikes)

    return(
          <div className="ui-card">
            <div>
                <h1> My Profile </h1>
                <h2>Name: {name}</h2>
                <h3>Avatar: {img_url}</h3>
                <h3>DOB: {birthdate}</h3>
                <h3>email: {email}</h3>
            </div>
            <br/>
            <div>
                <h2>Your Stats</h2>
                <h3>Total Blogs Posted: {totalBlogs}</h3>
                <h3>Total Likes Recieved: {totalLikes}</h3>
                <br/>
                <h2>Your Blogs:</h2>
                <ul>{renderMyBlogs}</ul>
            </div>
          </div>
    )
}

export default MyProfile