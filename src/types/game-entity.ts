export interface SimpleGameEntity {
    gameId: string,
    gameName: string
}
export interface GameEntity extends SimpleGameEntity{
    thumbnail: string,
    yearPublished: number,
    averageRating: number,
    rank: number,
}
