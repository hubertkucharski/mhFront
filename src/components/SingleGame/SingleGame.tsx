import {apiUrl} from "../../config/apiUrl";
import {useEffect, useState} from "react";
import {GameEntity} from "../../types/game-entity";
import './SingleGame.css';

interface Props{
    gameId: string
}

export const SingleGame =(props: Props) =>{

    const [gameDetails, setGameDetails] = useState<GameEntity | null>(null)

        useEffect(()=>{
            (async()=>{
                const res = await fetch(`${apiUrl}/api/mh/${props.gameId}`)
                const data = await res.json();
                console.log(data)
                setGameDetails(data)
            })()
        },[])
    if(gameDetails === null){
        return <p>Loading data..</p>
    }
    return(
        <div className='mini_single_game_view'>
            <img src={`${gameDetails.thumbnail}`} alt=""/>
            <h3>BGG rating: {`${gameDetails.averageRating}/10`} and {gameDetails.rank>0 ?`rank: ${gameDetails.rank}` : 'not ranked.'}
                <p>
                Published in: {`${gameDetails.yearPublished}`}
            </p>
            <button type='submit' className='btn btn-primary'>Add game to my collection</button>
            </h3>
        </div>
    )
}
