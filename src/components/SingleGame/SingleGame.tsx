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
    const [id, setId] = useState('');
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
                const res = await fetch(`${apiUrl}/api/mh`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({gameId: gameDetails?.gameId, userId: props.userId})
                    }
                );
                const data = await res.json();

                setId(data.collectionId);

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

    if (id) {
        return (
            <>
                <h2>Game {gameDetails.gameName} has been added to your collection.</h2>
            </>)
    }
    if (id === undefined) {
        return (
            <>
                <h2>You already have {gameDetails.gameName} in your collection.</h2>
            </>)
    }

    const showInfo = () => {
        setTimeout(() => setIsUserId(null), 2000)
        return 'Please, log in (select user on top).'
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
