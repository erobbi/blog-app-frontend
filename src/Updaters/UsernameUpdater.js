import { useState } from 'react'

function UsernameUpdater( { user, setUser } ) {
    const [username, setName] = useState(user.username);


    function handleSubmit(e) {
        e.preventDefault();
        fetch(`users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username
            }),
        })
        .then((r) => r.json())
        .then((user) => setUser(user))
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
        
                <input type="text" placeholder="Set Name" onChange={e => setName(e.target.value)} value={username} />
    
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default UsernameUpdater;