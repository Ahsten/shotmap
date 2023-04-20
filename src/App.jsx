import './App.css'
import { useEffect, useState } from "react"
import Shotmap from './components/shotmap/Shotmap'
import Navbar from './components/navbar/Navbar'
import StatTable from './components/stat-table/StatTable'
import Scorebug from './components/scorebug/Scorebug'
import PlayerCard from './components/player-card/PlayerCard'
import Sidebar from './components/sidebar/sidebar'
import { data } from 'autoprefixer'

function App() {
  const [gameData, setGameData] = useState()
  const [gameID, setGameID] = useState("2021030125")
  const [home, setHome] = useState("TOR")
  const [away, setAway] = useState("TBL")

  useEffect(() => {
    d3.selectAll(".shot").remove()

    fetch(`https://statsapi.web.nhl.com/api/v1/game/${gameID}/feed/live`)
    .then(res => res.json())
    .then(data => {setGameData(data)})    
  }, [gameID])

  console.log(gameData)

  return (
    <div className="bg-neutral drawer">
      <input id="sidebar" type="checkbox" class="drawer-toggle"/>
      <div className='drawer-content grid-container'>
        <Navbar />
        <Scorebug home={home} away={away} />
        <Shotmap shotData={gameData} gameID={gameID} setGameData={setGameData}/>
        <StatTable id={gameID} setAway={setAway} setHome={setHome} home={home} away={away}/>
        <div className="grid grid-cols-2 gap-4 m-4">
            <PlayerCard players={gameData?.liveData.boxscore.teams.home.players}/>
            <PlayerCard players={gameData?.liveData.boxscore.teams.away.players}/>
        </div>
      </div>
      <Sidebar onSelect={setGameID} homeTeam={home} awayTeam={away} />
    </div>
  )
}

export default App
