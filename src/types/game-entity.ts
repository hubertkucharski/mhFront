export interface SimpleGameEntity {
    gameId: string,
    gameName: string
}
export interface GameEntity extends SimpleGameEntity{
    gameBggId: number,
    image: string,
    thumbnail: string,
    yearPublished: number,
    averageRating: number,
    rank: number,
}
