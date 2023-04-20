import { useState } from "react"


export default function PlayerCard({ players }){
    const [player, setPlayer] = useState()
    const allPlayers = players ? Object.values(players) : [];

    function handleChange(name){
        console.log(name)
        const selectedPlayer = allPlayers.find(player => player.person.fullName === name)
        setPlayer(selectedPlayer)
    }

    return <div className="card card-bordered bg-base-100">
            <select className="select" onChange={(e) => handleChange(e.target.value)}>
            <option disabled selected>Select a player</option>
            {allPlayers?.map(player => <option value={player.person.fullName}>{player.person.fullName}</option>)}
            </select>
        <div className="card-body">
            <div className="player-info">
                <div className="card-title">{player?.person.fullName}</div>
                <div>Number: {player?.jerseyNumber}</div>
                <div>Position: {player?.position.type}</div>
            </div>
            <div className="divider">Stats</div>
            <div className="player-stats">
                <div>Goals: {player?.stats?.skaterStats?.goals}</div>
                <div>Assists: {player?.stats?.skaterStats?.assists}</div>
                <div>Points: {player?.stats?.skaterStats?.goals}</div>
                <div>+/-: {player?.stats?.skaterStats?.plusMinus}</div>
                <div>PIMS: {player?.stats?.skaterStats?.penaltyMinutes}</div>
                <div>Takeaways: {player?.stats?.skaterStats?.takeaways}</div>
                <div>Giveaways: {player?.stats?.skaterStats?.giveaways}</div>
                <div>Shots: {player?.stats?.skaterStats?.shots}</div>
                <div>Blocks: {player?.stats?.skaterStats?.blocked}</div>
            </div>
        </div>
    </div>
}