import {useContext, useEffect, useState} from "react";
import {apiUrl} from "../../config/apiUrl";
import {SimpleGameEntity} from "../../types/game-entity";
import {SingleGame} from "../SingleGame/SingleGame";
import {UserIdContext} from '../FindGames/FindGames';

import './AddForm.css';

export const AddForm = () => {
    const context = useContext(UserIdContext);

    const [games, setGames] = useState<SimpleGameEntity[]>([]);
    const [gameName, setGameName] = useState<undefined | string>(undefined);
    const [selectedGameId, setSelectedGameId] = useState('');

    const {selectedUserId} = context;

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/bgg-games/find-by-name/${gameName}`);
            const data = await res.json();

            setGames(data);
        })()
    }, [gameName]);

    const [isSend, setIsSend] = useState<number>(100);

    const sendForm = (e: any) => {
        e.preventDefault();
    };

    const showDetails = (gameId: string): void => {
        selectedGameId !== gameId ? setSelectedGameId(gameId) : setSelectedGameId('');
    };

    if (isSend === 200) {
        return (
            <section className="contact">
                <h2>Thank you for adding new game!</h2>
                <h5>Your collection is beautiful.</h5>
            </section>
        );
    }

    return (
        <>
            <section id='contact'>

                <h2>You can add new game to your collection</h2>
                <h5>English names only (for example: catan, puerto rico)</h5>

                <div className="container contact__container">

                    <form onSubmit={sendForm}>
                        <input
                            type="text"
                            name='gameName'
                            placeholder='Name of the game'
                            onChange={
                                event => event.target.value.length > 2 ?
                                    setGameName(event.target.value) :
                                    ''}
                            required/>
                        {!gameName ? <h5>Write at least 3 characters.</h5> : ''}

                    </form>
                </div>
                <ul>
                    {games.map(game => (
                        <li key={game.gameId}>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                showDetails(game.gameId)
                            }}>
                                {(game.gameName)}
                            </a>
                            {game.gameId === selectedGameId ? (
                                // <SingleGame gameId={game.gameId} userId={props.selectedUserId}/>
                                <SingleGame gameId={game.gameId} userId={selectedUserId}/>
                            ) : ''}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};
