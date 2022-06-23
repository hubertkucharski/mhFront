import {Btn} from "../common/Btn/Btn";
import {useEffect, useState} from "react";
import {apiUrl} from "../../config/apiUrl";
import {UserGameCollection} from "../UserGameCollection/UserGameCollection";

interface Props{
    userId: string
}
export const MyCollection = (props: Props) =>{

    const [userCollection, setUserCollection] = useState<{gameId: string, userId: string}[]>([])

    useEffect(()=>{
        (async ()=>{
            const res = await fetch(`${apiUrl}/api/mh/my-collection/${props.userId}`)
            const data = await res.json();

            setUserCollection(data);
            // await data.map((el: {userId: string, gameId: string})=>(
            //     setUserGameNameCollection(userGameNameCollection=> [...userGameNameCollection, await fetch(`${apiUrl}/api/mh/${el.gameId}`)])
            // )
            //stworzyc nowy komponent i przekazac w propsach tablice z gameId

            // data.map(async (el: {userId: string, gameId: string})=>(
                // const resGames = await fetch(`${apiUrl}/api/mh/${el.gameId}`)
                // const dataGames = await resGames.json()
                // console.log(dataGames)
                // console.log(await fetch(`${apiUrl}/api/mh/${el.gameId}`))
                // setUserCollection(el.gameId)
            // ))

            // const resGames = await fetch(`${apiUrl}/api/mh/${gameId}`)
            // const dataGames = await resGames.json();
            // console.log(dataGames)
            // setUserCollection(dataGames);
        })()
    },[])

    return(
        <>
            <Btn to='/' text='Return to home page'/>
            {userCollection.map(game=>(
                    <li key={game.gameId}>
                        <UserGameCollection gameId={game.gameId}/>
                    </li>
                )
            )}
        </>
    )
}
