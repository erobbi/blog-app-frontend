import { useState } from 'react'

function EmailUpdater( { user, setUser } ) {

    const [email, setEmail] = useState(user.email);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email
            }),
        })
        .then((r) => r.json())
        .then((user) => setUser(user))
    }
    

    return (
        <div>
        <form onSubmit={handleSubmit}>
        
            <input type="text" placeholder="Set Email" onChange={e => setEmail(e.target.value)} value={email} />
    
            <input type="submit" value="Submit"/>
        </form>
        </div>
    )
}

export default EmailUpdater;