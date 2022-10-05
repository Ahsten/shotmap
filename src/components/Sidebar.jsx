import { useState } from "react";

export default function Sidebar({gameID, onSelect}){
    const [schedule, setSchedule] = useState(null)

    function getGame(game){
        onSelect(game.toString())
    }

    async function getSchedule(){
        const response = await fetch(`https://statsapi.web.nhl.com/api/v1/schedule?date=2022-01-01`, {mode: 'cors'})
        const data = await response.json()
        const sched = await data.dates[0].games
        const games = sched.map((game, index) => <li key={index} className="game">
            <a onClick={()=> getGame(game.gamePk)}>{game.teams.away.team.name}<br/>
                {game.teams.home.team.name}
                </a>
            </li>)

        setSchedule(games)
    }

    return <div className="sidebar">
        <button onClick={getSchedule}>Get Games</button>
        <ul className="games">{schedule}</ul>
    </div>
}