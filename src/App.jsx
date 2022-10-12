import './App.css'
import { useEffect, useState } from "react"
import Shotmap from './components/Shotmap'
import Navbar from './components/Navbar'
import StatTable from './components/StatTable'
import Scorebug from './components/Scorebug'

function App() {
  const [gameData, setGameData] = useState()
  const [gameID, setGameID] = useState("2021030125")
  const [home, setHome] = useState("TOR")
  const [away, setAway] = useState("TBL")

  useEffect(() => {
    d3.selectAll(".shot").remove()

    fetch(`https://statsapi.web.nhl.com/api/v1/game/${gameID}/feed/live`)
    .then(res => res.json())
    .then(data => setGameData(data))
    
  }, [gameID])

  return (
    <div className="bg-base-100">
      <Navbar onSelect={setGameID} homeTeam={home} awayTeam={away}/>
      <div className='grid grid-cols-3 grid-rows-10 gap-2 p-4'>
        <Scorebug home={home} away={away}/>
        <Shotmap shotData={gameData} gameID={gameID} setGameData={setGameData}/>
        <StatTable id={gameID} setAway={setAway} setHome={setHome} home={home} away={away}/>
      </div>
    </div>
  )
}

export default App
