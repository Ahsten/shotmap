import './App.css'
import { useEffect, useState } from "react"
import StatTable from './components/StatTable'
import Shotmap from './components/Shotmap'
import Sidebar from './components/Sidebar'
import '@tremor/react/dist/esm/tremor.css';

function App() {
  const [gameData, setGameData] = useState()
  const [gameID, setGameID] = useState("2021030125")

  useEffect(() => {
    d3.selectAll(".shot").remove()

    fetch(`https://statsapi.web.nhl.com/api/v1/game/${gameID}/feed/live`)
    .then(res => res.json())
    .then(data => setGameData(data))
    
  }, [gameID])

  return (
    <div className="App">
      <Sidebar onSelect={setGameID}/>
      <div className="data-grid">
        <Shotmap shotData={gameData} gameID={gameID} setGameData={setGameData}/>
        <StatTable id={gameID} />
      </div>
    </div>
  )
}

export default App
