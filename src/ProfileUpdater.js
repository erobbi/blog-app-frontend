import { useState } from 'react'

function ProfileUpdater( { user, setUser } ) {
    const [username, setName] = useState(user.username);
    const [img_url, setImgUrl] = useState(user.img_url);
    const [birthdate, setBirthDate] = useState(user.birthdate);
    const [email, setEmail] = useState(user.email);


    function handleSubmit(e) {
        e.preventDefault();
        fetch(`users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                img_url: img_url,
                birthdate: birthdate,
                email: email
            }),
        })
        .then((r) => r.json())
        .then((user) => setUser(user))
    }
    

    return (
        <div>
            <h2>Modify your Profile here</h2>
        <form onSubmit={handleSubmit}>
        
        
            <input type="text" placeholder="Set Name" onChange={e => setName(e.target.value)} value={username} />
            <input type="text" placeholder="Set Avatar" onChange={e => setImgUrl(e.target.value)} value={img_url} />
            <input type="text" placeholder="Set Birthdate" onChange={e => setBirthDate(e.target.value)} value={birthdate} />
            <input type="text" placeholder="Set Email" onChange={e => setEmail(e.target.value)} value={email} />
    
            <input type="submit" value="Submit"/>
        </form>
        </div>
    )
}

export default ProfileUpdater;