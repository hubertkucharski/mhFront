import {useContext, useEffect, useState} from "react";
import {apiUrl} from "../../config/apiUrl";
import {UserGameCollection} from "../UserGameCollection/UserGameCollection";
import {UserIdContext} from "../FindeGames/FindeGames";

export const MyCollection = () =>{

    const [userCollection, setUserCollection] = useState<{gameId: string, userId: string}[]>([]);

    const  context = useContext(UserIdContext)
    const { selectedUserId } = context;

    const refreshList = async () =>{
        setUserCollection([]);
        const res = await fetch(`${apiUrl}/api/mh/my-collection/${selectedUserId}`);
        const data = await res.json();

        setUserCollection(data);
    }

    useEffect(()=> {
        refreshList();
    },[selectedUserId]);

    if(selectedUserId !== ''){

    return(
        <>
            <div className="container">
                {!userCollection.length ? <h2>You have added nothing into your collection yet</h2> :  <h2>You have in your collection:</h2>}

            <ul>
                {userCollection.map((game)=>(
                    <li key={game.gameId}>
                        <UserGameCollection gameId={game.gameId} userId={game.userId} onCollectionChange={refreshList}/>
                    </li>
                )
            )}
            </ul>
            </div>
        </>
    )
    } else return <h2>Pleas select user to see games collection.</h2>
}
