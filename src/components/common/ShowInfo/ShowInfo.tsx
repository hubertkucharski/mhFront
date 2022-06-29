interface Props{
    text: string,
    gameName?: string
}

export const ShowInfo = (props: Props) =>{
    return (
        <h3>Game {props.gameName} has been {props.text}. </h3>
    )
}
