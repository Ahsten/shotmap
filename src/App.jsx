import './App.css'
import { useEffect, useState } from "react"
import Shotmap from './components/shotmap/Shotmap'
import Navbar from './components/navbar/Navbar'
import StatTable from './components/stat-table/StatTable'
import Scorebug from './components/scorebug/Scorebug'

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

  return (
    <div className="bg-neutral">
      <Navbar onSelect={setGameID} homeTeam={home} awayTeam={away}/>
      <div className='grid-container'>
        <Scorebug home={home} away={away}/>
        <Shotmap shotData={gameData} gameID={gameID} setGameData={setGameData}/>
        <StatTable id={gameID} setAway={setAway} setHome={setHome} home={home} away={away}/>
      </div>
    </div>
  )
}

export default App
