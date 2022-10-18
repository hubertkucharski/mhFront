import {useContext, useEffect, useState} from "react";
import {UserGameCollection} from "../UserGameCollection/UserGameCollection";
import {UserIdContext} from "../FindGames/FindGames";
import {apiUrl} from "../../config/apiUrl";

export const MyCollection = () => {

    const [userCollection, setUserCollection] = useState<{ gameId: string, gameBggId: string, userId: string }[]>([]);

    const context = useContext(UserIdContext)
    const {selectedUserId} = context;

    const refreshList = async () =>{
        if (!selectedUserId){
            return setUserCollection([])
        }
        const res = await fetch(`${apiUrl}/collection/${selectedUserId}`);
        const data = await res.json();

        setUserCollection(data[0].gameId)
    }

    useEffect(() => {
        refreshList();
    }, [selectedUserId]);

    if (selectedUserId !== '') {

        return (
            <>
                <div className="container">
                    {!userCollection.length ?
                        <h2>You have added nothing into your collection yet</h2> :
                        <h2>You have in your collection:</h2>}

                    <ul>
                        {userCollection.map((game) => (
                                <li key={game.gameId}>
                                    <UserGameCollection gameId={game.gameId} gameBggId={game.gameBggId} userId={selectedUserId}
                                                        onCollectionChange={refreshList}/>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </>
        )
    } else return <h2>Pleas login to see game collection.</h2>
}
