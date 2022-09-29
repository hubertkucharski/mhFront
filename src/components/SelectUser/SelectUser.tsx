import {apiUrl} from "../../config/apiUrl";
import {ChangeEvent, useEffect, useState} from "react";

interface Props{
    handleUserChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const SelectUser = ({handleUserChange}: Props) =>{

    const [users, setUsers] = useState<{ userId: string }[]>([]);
    const [selectUser, setSelectUser] = useState('');


    useEffect(()=>{
        // pobiera userId wszystkich użytkowników
        (async ()=>{
            const res = await fetch(`${apiUrl}/user/`);
            const data = await res.json();

            setUsers(data);
        })()
    },[]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>{
        handleUserChange(e);

        setSelectUser(e.target.value)
    }
    return(
    <>
        <h5>Select your ID to add games and see your collection</h5>
        <select name="user" id="user"  value={selectUser} onChange={handleChange}>
            {
                users.map(user=>(
                        <option key={user.userId} value={user.userId}>
                            {user.userId}
                        </option>
                    )
                )
            }
        </select>
    </>
    )
}
