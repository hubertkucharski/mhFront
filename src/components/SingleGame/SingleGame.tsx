import {apiUrl} from "../../config/apiUrl";
import {SyntheticEvent, useEffect, useState} from "react";
import {GameEntity} from "../../types/game-entity";
import './SingleGame.css';

interface Props {
    gameId: string,
    userId: string
}

export const SingleGame = (props: Props) => {

    const [gameDetails, setGameDetails] = useState<GameEntity | null>(null)
    const [id, setId] = useState<number>(0);
    const [isUserId, setIsUserId] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false)

    const addGame = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (props.userId === '') {
            setIsUserId(false)
        } else {
            try {
                setLoading(true)
                setIsUserId(true)
                const res = await fetch(`${apiUrl}/collection/add`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({gameId: gameDetails?.gameId})
                    }
                );
                const data = await res.json();

                setId(data.statusCode);

            } finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/bgg-games/find-by-id/${props.gameId}`)
            const dataImage = await res.json();

            //fetch for image
            // const resBgg = await fetch(`${bggApiUrl}/${props.gameId}`)
            // const {thumbnail} = await resBgg.json()
            // const data = {...dataImage, thumbnail: dataImage.thumbnail}

            // setGameDetails(data)
            setGameDetails(dataImage)
        })()
    }, [])

    if (gameDetails === null || loading) {
        return <p>Loading data..</p>
    }

    if (id === 200) {
        return (
            <>
                <h2>Game {gameDetails.gameName} has been added to your collection.</h2>
            </>)
    }
    if (id === 201) {
        return (
            <>
                <h2>You already have {gameDetails.gameName} in your collection.</h2>
            </>)
    }
    if (id === 401) {
        return (
            <>
                <h2>Wrong data.</h2>
            </>)
    }

    const showInfo = () => {
        setTimeout(() => setIsUserId(null), 2000)
        return 'Please, log in first.'
    }
    return (
        <div className='mini_single_game_view'>
            <img src={`${gameDetails.thumbnail}`} alt=""/>
            <h3>BGG
                rating: {`${gameDetails.averageRating}/10`} and {gameDetails.rank > 0 ? `rank: ${gameDetails.rank}` : 'not ranked.'}
                <p>
                    Published in: {`${gameDetails.yearPublished}`}
                </p>
                {props.userId === '                 --- Select user ---'
                    ? showInfo()
                    : <button
                        type='submit'
                        className='btn btn-primary'
                        onClick={addGame}>
                        Add game to yours collection
                    </button>}
                <p>{isUserId === false ? showInfo() : ''}</p>
            </h3>
        </div>
    )
}
