import {useEffect, useState} from "react";
import {apiUrl} from "../../config/apiUrl";
import {GameEntity} from "../../types/game-entity";

interface Props{
    gameId: string
    // gameList:
    //     {
    //         gameId: string,
    //         userId: string
    //     }[]
}

export const UserGameCollection = (props: Props) =>{

    const [gamesName, setGamesName] = useState<GameEntity>()

    useEffect(()=>{
        (async ()=>{
            const res = await fetch(`${apiUrl}/api/mh/${props.gameId}`)
            const data = await res.json();

            setGamesName(data);
        })()
    },[])

    return(
        <>
            <h3>{gamesName?.gameName}</h3>
        </>
    )
}
