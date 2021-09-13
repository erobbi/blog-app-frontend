function RenderBlog({ blogs, blog }) {
    const { id, title, content, likes, img_url, created_at } = blog
    return(
        <li>
            <div>
                <h2>{title}</h2>
                <h4>{content}</h4>
                <div>
                   <img src={img_url} attr="image" />
                </div>
                <h4>Likes: {likes}</h4>
                <p>posted: {created_at}</p>
            </div>
        </li>
    )
}

export default RenderBlog