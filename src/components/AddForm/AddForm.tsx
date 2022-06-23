import { useEffect, useState} from "react";
import {apiUrl} from "../../config/apiUrl";
import {SimpleGameEntity} from "../../types/game-entity";

import './AddForm.css';
import {SingleGame} from "../SingleGame/SingleGame";
import {Btn} from "../common/Btn/Btn";

export const AddForm = () =>{

    const [games, setGames] = useState<SimpleGameEntity[]>([])
    const [gameName, setGameName] = useState<undefined | string>(undefined);
    const [selectedGameId, setSelectedGameId] = useState('');

useEffect(()=>{
    (async()=>{
        const res = await fetch(`${apiUrl}/api/mh/search/${gameName}`)
        const data = await res.json();

        setGames(data)
    })()
},[gameName])

        const [isSend, setIsSend] = useState<number>(100);

    const sendForm = (e: any) => {
        e.preventDefault();
    }

    const showDetails = (gameId: string) :void  => {
        selectedGameId !== gameId ? setSelectedGameId(gameId) : setSelectedGameId('');
    }

    if (isSend === 200) {
        return(
            <section className="contact">
                <h2>Thank you for adding new game!</h2>
                <h5>Your collection is beautiful.</h5>
            </section>
        )

    }
    return (
        <>
            <section id='contact'>
                <Btn to='/my-collection'  text='Show my collection' />
                <h5>You can add new game to your collection</h5>
                <h2>English names</h2>

                <div className="container contact__container">

                    <form onSubmit={sendForm}>
                        <input
                            type="text"
                            name='gameName'
                            placeholder='Name of the game'
                            onChange={
                            event => event.target.value.length>2 ?
                                setGameName(event.target.value) :
                                ''}
                            required/>
                        {!gameName ? <small>Write at least 3 characters.</small> : ''}


                    </form>
                </div>
                <ul>
                    {games.map(game=>(
                        <li key={game.gameId}>
                            <a href="#" onClick={(e)=> {e.preventDefault(); showDetails(game.gameId)}}>
                                {(game.gameName)}
                            </a>
                                {game.gameId === selectedGameId ? (
                                        <SingleGame gameId={game.gameId} />
                                    ) : ''}
                            {/*{game.gameId}*/}


                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};
