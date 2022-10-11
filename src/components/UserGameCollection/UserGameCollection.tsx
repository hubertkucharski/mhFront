import {useEffect, useState} from "react";
import {apiUrl} from "../../config/apiUrl";
import {GameEntity} from "../../types/game-entity";
import {ShowInfo} from "../common/ShowInfo/ShowInfo";

interface Props {
    gameId: string,
    gameBggId: string,
    userId: string,
    onCollectionChange: () => void
}

export const UserGameCollection = (props: Props) => {

    const [gamesName, setGamesName] = useState<GameEntity>()
    const [deleteGame, setDeleteGame] = useState(false)

    useEffect(() => {
        (async () => {

            const res = await fetch(`${apiUrl}/bgg-games/find-by-id/${props.gameId}`);
            const data = await res.json();

            setGamesName(data);
        })()
    }, [props.gameId])

    const handleDelete = async () => {

        const res = await fetch(`${apiUrl}/collection/remove`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({gameId: props.gameId, userId: props.userId})
        });
        setDeleteGame(true)

        if (res.ok) {
            setDeleteGame(true);
        }
    }
    if (deleteGame) {
        setTimeout(() => {
            setDeleteGame(false);
            props.onCollectionChange();
        }, 2000)
        return (
            <ShowInfo text={'deleted'} gameName={gamesName?.gameName}/>
        )
    }
    if (props.gameId !== '') {
        return (
            <>
                <h3>
                    <a href={`https://boardgamegeek.com/boardgame/${props.gameBggId}`} target="_git" rel="noreferrer">
                        {gamesName?.gameName}
                    </a>
                    <button
                        className='btn btn-primary'
                        onClick={handleDelete}>
                        Delete game from collection
                    </button>
                </h3>
            </>
        )
    } else return (<></>)
}
