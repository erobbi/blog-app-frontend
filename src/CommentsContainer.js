import { useState } from 'react'
import CommentUpdater from './Updaters/CommentUpdater'
import CommentForm from './CommentForm'

function CommentsContainer({ user, blog }) {
    const [ comments, setComments ] = useState(blog.comments)  
    const [ isClicked, setIsClicked ] = useState(false)
    const [ edit, setEdit ] = useState(false)

    function handleDeleteClick(id) {
      fetch(`/comments/${id}`, {
        method : 'DELETE'
      })
      const deletedItem = [...comments].filter(comment => comment.id !== id)
      setComments(deletedItem)
    }

    function handleUpdate() {
       setEdit(!edit)
    }
  
    
    const renderComments = comments.map(comment => {
        return (
            <li className="comments" key={comment.id}> 
              <div>
              <p className="comment-user">{comment.who_wrote_comment}:{comment.content}</p>
              </div>
              { user.id === comment.user_id ? 
              
                <div>
                { edit ? null : <button onClick={handleUpdate}>Edit</button> }
                { edit ? <CommentUpdater user_id={user.id} blog_id={blog.id} comment={comment} edit={edit} setEdit={setEdit} comments={comments} setComments={setComments} /> : null }
                { edit ? null : <button onClick={()=> handleDeleteClick(comment.id)}>X</button> }
                </div> 
                
              : null } 
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