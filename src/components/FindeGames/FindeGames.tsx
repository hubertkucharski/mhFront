import {SelectUser} from "../SelectUser/SelectUser";
import {ChangeEvent, createContext, useState} from "react";
import {Header} from "../Header/Header";

export interface UserIdContextType{
    selectedUserId: string
}

export const UserIdContext = createContext<UserIdContextType>({selectedUserId: ''})

export const FindeGames = () =>{

    const [ selectedUserId, setSelectUserId ] = useState('')

    const handleUserChange = (e: ChangeEvent<HTMLSelectElement> ) =>{
        setSelectUserId(e.target.value)
    }

    return(
        <UserIdContext.Provider value={{selectedUserId}}>
            <SelectUser handleUserChange = {handleUserChange} />

            <Header />

        </UserIdContext.Provider>
    )
}
