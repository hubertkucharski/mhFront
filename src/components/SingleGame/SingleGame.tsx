import {apiUrl} from "../../config/apiUrl";
import {SyntheticEvent, useEffect, useState} from "react";
import {GameEntity} from "../../types/game-entity";
import './SingleGame.css';

interface Props{
    gameId: string
}

export const SingleGame =(props: Props) =>{

    const [gameDetails, setGameDetails] = useState<GameEntity | null>(null)
    const [id, setId] = useState('')
    const addGame = async (e: SyntheticEvent) =>{
        e.preventDefault();
        try{
            const res = await fetch(`${apiUrl}/api/mh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({gameId: gameDetails?.gameId, userId: '7a9f761e-f155-11ec-b862-3ecfab8190d4'})
            }
        );
            const data = await res.json();
            setId(data.collectionId)
        }
        finally {
        console.log('single finally')
        }

    }

        useEffect(()=>{
            (async()=>{
                const res = await fetch(`${apiUrl}/api/mh/${props.gameId}`)
                const data = await res.json();

                setGameDetails(data)
            })()
        },[])

    if(gameDetails === null){
        return <p>Loading data..</p>
    }
    if(id){
        return (
            <>
                <h2>Game {gameDetails.gameName} has been added to your collection.</h2>
                {/*<p className='adConfirmView'>*/}
                {/*    <Btn to='/' text={'Powrót do strony głównej'}/>*/}
                {/*</p>*/}
            </>)
    }
    return(
        <div className='mini_single_game_view'>
            <img src={`${gameDetails.thumbnail}`} alt=""/>
            <h3>BGG rating: {`${gameDetails.averageRating}/10`} and {gameDetails.rank>0 ?`rank: ${gameDetails.rank}` : 'not ranked.'}
                <p>
                Published in: {`${gameDetails.yearPublished}`}
            </p>
            <button type='submit' className='btn btn-primary' onClick={addGame}>Add game to my collection</button>
            </h3>
        </div>
    )
}
