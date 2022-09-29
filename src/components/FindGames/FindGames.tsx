import {createContext, useEffect, useState} from "react";
import {Header} from "../Header/Header";
import {useAppSelector} from "../../redux/app/hooks";

export interface UserIdContextType {
    selectedUserId: string
}

export const UserIdContext = createContext<UserIdContextType>({selectedUserId: ''})

export const FindGames = () => {

    const userState = useAppSelector((state) => state.user);
    const currUser = userState.user;

    const [selectedUserId, setSelectUserId] = useState('')

    useEffect(() => {
        !currUser ? handleUserChange('') : handleUserChange(currUser.userId)
        console.log(selectedUserId, 'selectedUserId')
    }, [currUser]);


    const handleUserChange = (id: string) => {
        if (id) {
            setSelectUserId(id);
        } else return null;
    };

    return (
        <UserIdContext.Provider value={{selectedUserId}}>

            <Header/>

        </UserIdContext.Provider>
    )
}
