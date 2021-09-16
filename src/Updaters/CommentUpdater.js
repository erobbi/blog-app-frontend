import { useState } from 'react'

function CommentUpdater ({ user_id, blog_id, comment, edit, setEdit, comments, setComments }) {
    const [ content, setContent ] = useState(comment.content)

    function handleAddComment (e) {
        e.preventDefault();
        fetch(`/comments/${comment.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: comment.id,
                user_id,
                blog_id,
                content
            }),
        })
        .then((r) => r.json())
        .then(newComment => {
            const newLists = [...comments].map(comment => {
                if (comment.id === newComment.id) {
                    return newComment
                } else {
                    return comment
                }
            })
            setComments(newLists) 
            setEdit(!edit)
        })
    }

    return (
        <form onSubmit={handleAddComment}>
            <input className="comment-input" size="40" value={content} type="text" name="content" placeholder="write comment..." onChange ={(e)=>setContent(e.target.value)} />
            <button className="blog-button">Add Comment</button>
        </form>
    )
}

export default CommentUpdater