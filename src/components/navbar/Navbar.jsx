import { useState, useEffect } from "react"

export default function Navbar({onSelect, homeTeam, awayTeam}){
  const [schedule, setSchedule] = useState(null)
  const [date, setDate] = useState("2023-01-29")

  function getGame(game){
    onSelect(game.toString())
  }

  function handleGetDay(event){
    setDate(event.target.value);
  }

  useEffect(() => {
    async function getSchedule(){
        const response = await fetch(`https://statsapi.web.nhl.com/api/v1/schedule?date=${date}`, {mode: 'cors'})
        const data = await response.json()
        const sched = await data.dates[0].games
        const games = sched.map((game, index) => <li key={index} >
            <a onClick={()=> getGame(game.gamePk)} className="flex-1 gap-4" data-testid="game">{game.teams.away.team.name}<br/>
                {game.teams.home.team.name}
                </a>
            </li>)

        setSchedule(games)
    }
    getSchedule()
  }, [date])

    return<div className="navbar shadow z-40 bg-base-100">
    <div className="flex-2">
      <a className="btn btn-ghost normal-case text-xl">NHL Dashboard</a>
    </div>
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn m-1">Games</label>
      <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box w-52">
            {schedule}
      </ul>
    </div>
    <input type="date" onChange={(e) => handleGetDay(e)} data-testid="date-picker"/>
  </div>
}