import {Link} from 'react-router-dom'

function RenderBlog({ blogs, blog }) {
    const { id, title, description, content, likes, img_url, created_at } = blog
    return(
        <li>
            <div>
                <h2>{title}</h2>
                <Link to={`/blog/${blog.id}`} activeClassName="active">{title}</Link>
                
                {/* I might try adding links to each article */}
                <h3>{description}</h3>
                <h4>{content}</h4> 
                {/* content should be removed for profile and blog feed */}
                <div>
                   <img src={img_url} attr="image" />
                   {/* this throws an error when the link is not proper. perhaps we should add error handling and/or filtering? */}
                </div>
                <h4>Likes: {likes}</h4>
                <p>posted: {created_at}</p>
            </div>
        </li>
    )
}

export default RenderBlog