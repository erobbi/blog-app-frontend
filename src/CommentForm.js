import { useState } from 'react'

function CommentForm ({ isClicked, setIsClicked, user, blog, setComments, comments }) {
    const [ content, setContent ] = useState("")

    function handleAddComment (e) {
        e.preventDefault();
        fetch('/comments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.id,
                blog_id: blog.id,
                content
            }),
        })
        .then((r) => r.json())
        .then(newComment => {
            console.log(newComment)
            setComments([...comments, newComment]) 
            setIsClicked(!isClicked)
        })
    }

    return (
        <form onSubmit={handleAddComment}>
            <input type="text" name="content" placeholder="write comment..." onChange={(e)=>setContent(e.target.value)} />
            <button>Add Comment</button>
        </form>
    )
}

export default CommentForm