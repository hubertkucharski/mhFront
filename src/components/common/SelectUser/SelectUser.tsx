import {useEffect, useState} from "react";
import {apiUrl} from "../../../config/apiUrl";

interface Props {
    userId: string
}

export const MyCollection = (props: Props) => {

    const [allUsers, setAllUsers] = useState<{ userId: string }[]>([])

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/api/mh/my-collection/${props.userId}`)
            const data = await res.json();

            setAllUsers(data);
        })()
    }, [])

    return (
        <>
            <select name="users" id="users">
                {allUsers.map(user => (
                    <option key={user.userId}>
                        {user.userId}
                    </option>)
                )}
            </select>
            <MyCollection userId={''}/>
        </>
    )
}
