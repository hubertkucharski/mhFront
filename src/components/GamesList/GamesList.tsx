import {apiUrl} from "../../config/apiUrl";
import {useContext, useEffect, useState} from "react";
import {SearchContext} from "../../contexts/Search.context";
import {SimpleGameEntity} from "../../types/game-entity";


export const GamesList = () =>{
    const {search} = useContext(SearchContext)
    const [games, setGames] = useState<SimpleGameEntity[]>([])

    useEffect(()=>{
        (async()=>{
            const res = await fetch(`${apiUrl}/api/mh/search/${search}`)
            const data = await res.json();

            setGames(data)
        })()
    },[search])
    return(
        <>
            <ul>
                {
                    games.map(game=>(
                            <li key={game.gameId}>
                                {game.gameName}
                                    {/*<SingleAd id={ad.id}/>*/}
                            </li>
                        )
                    )
                }
            </ul>
        </>
    )
}
