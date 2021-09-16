import { useState } from 'react'
import CommentForm from './CommentForm'

function CommentsContainer({ user, blog }) {
    const [ comments, setComments ] = useState(blog.comments)  
    const [ isClicked, setIsClicked ] = useState(false)
    console.log(comments)
    
    const renderComments = comments.map(comment => {
       
        return (
              <li className="comments" key={comment.id}> 
              {comment.user_id} : {comment.content} 
            </li>
        )
    })
    function addComments () {
        setIsClicked(!isClicked)
    }

    return( 
      <div>
      { comments.length > 0 ? 
        <ul>
          {renderComments}
        </ul>
       : null }
      { isClicked ? <CommentForm isClicked={isClicked} user={user} blog={blog} setIsClicked={setIsClicked} setComments={setComments} comments={comments}/> 
       : <button className="blog-button" onClick={addComments} >Add Comments</button> }
      </div>
      
    )
}

export default CommentsContainer;