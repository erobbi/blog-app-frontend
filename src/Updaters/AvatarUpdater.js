import { useState } from 'react'

function AvatarUpdater( { user, setUser } ) {
    const [img_url, setImgUrl] = useState(user.img_url);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                img_url: img_url
            }),
        })
        .then((r) => r.json())
        .then((user) => setUser(user))
    }
    

    return (
        <div>
        <form onSubmit={handleSubmit}>
        
            <input type="text" placeholder="Set Avatar" onChange={e => setImgUrl(e.target.value)} value={img_url} />
             
            <input type="submit" value="Submit"/>
        </form>
        </div>
    )
}

export default AvatarUpdater;