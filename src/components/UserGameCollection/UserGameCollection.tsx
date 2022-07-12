import {useEffect, useState} from "react";
import {apiUrl} from "../../config/apiUrl";
import {GameEntity} from "../../types/game-entity";
import {ShowInfo} from "../common/ShowInfo/ShowInfo";

interface Props{
    gameId: string,
    userId: string,
    onCollectionChange: ()=> void
}

export const UserGameCollection = (props: Props) =>{

    const [gamesName, setGamesName] = useState<GameEntity>()
    const [deleteGame, setDeleteGame] = useState(false)

    useEffect(()=>{
        (async ()=>{

            const res = await fetch(`${apiUrl}/api/mh/${props.gameId}`);
            const data = await res.json();

            setGamesName(data);
        })()
    },[props.gameId])

    // useEffect(()=>{
    //     (async ()=>{
    //         console.log('uruchomienie use effect delete')
    //         const res = await fetch(`${apiUrl}/api/mh/`, {
    //             method: 'delete',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({gameId: props.gameId})
    //         });
    //         const data = await res.json();
    //         console.log(data)
    //         setDeleteGame(false);
    //     })()
    // },[deleteGame])

    const handleDelete = async () =>{

        const res = await fetch(`${apiUrl}/api/mh/`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({gameId: props.gameId, userId: props.userId})
        });

        if(res.ok){
            props.onCollectionChange();
        setDeleteGame(true)
        }
    }
    if(deleteGame){
        setTimeout(()=>setDeleteGame(false),2000)
    return(
        <ShowInfo text={'deleted'} gameName={gamesName?.gameName}/>
    )
    }
    if(props.gameId !== ''){
    return(
        <>
            <h3>
                <a href={`https://boardgamegeek.com/boardgame/${props.gameId}`} target="_git" rel="noreferrer">
                    {gamesName?.gameName}
                </a>
            <button
                className='btn btn-primary'
                // onClick={handleDelete}>
                onClick={handleDelete}>
                Delete game from collection
            </button>
            </h3>
        </>
    )
    }
    else return (<></>)
}
