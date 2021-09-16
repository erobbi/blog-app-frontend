import { useState } from 'react'

function DateUpdater( { user, setUser } ) {

    const [birthdate, setBirthDate] = useState(user.birthdate);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                birthdate: birthdate
            }),
        })
        .then((r) => r.json())
        .then((user) => setUser(user))
    }
    

    return (
        <div>
        <form onSubmit={handleSubmit}>
        
            <input type="text" placeholder="Set Birthdate" onChange={e => setBirthDate(e.target.value)} value={birthdate} placeholder="XXXX-XX-XX" />
    
            <input type="submit" value="Submit"/>
        </form>
        </div>
    )
}

export default DateUpdater;