import { useEffect } from 'react';
import { useState } from 'react';

export default function StatTable({id, setAway, setHome, home, away}){
    const [active, setActive] = useState(true)
    const [homeTeam, setHomeTeam] = useState([])
    const [awayTeam, setAwayTeam] = useState([])
    
    useEffect(()=>{
        let ignore = false

        fetch(`https://statsapi.web.nhl.com/api/v1/game/${id}/boxscore`)
            .then(res => res.json())
            .then(data => {
                if(!ignore){
                    setHomeTeam(Object.values(data.teams.home.players))
                    setAwayTeam(Object.values(data.teams.away.players))
                    setAway({
                        name: data.teams.away.team.name, 
                        goals: data.teams.away.teamStats.teamSkaterStats.goals,
                        shots: data.teams.away.teamStats.teamSkaterStats.shots
                    })
                    setHome({
                        name: data.teams.home.team.name, 
                        goals: data.teams.home.teamStats.teamSkaterStats.goals,
                        shots: data.teams.home.teamStats.teamSkaterStats.shots
                    })
                }
                console.log(data)
            })
        return () => {
            ignore = true
        }
    }, [id])    

    function hasPlayed(player){
        if(player.stats.skaterStats){
            return true
        }
    }

    function goaliePlayed(player){
        if(player.stats.goalieStats){
            return true
        }
    }

    return(
        <div className='shadow'>
            <div className="tabs tabs-boxed rounded-b-none flex flex-nowrap ">
                <a className={active ? "tab tab-active" : "tab"} onClick={() => setActive(true)}>{home?.name}</a> 
                <a className={active ? "tab" : "tab tab-active"} onClick={() => setActive(false)}>{away?.name}</a>
            </div>
        {active === true ? (
            <div>
                <table className='table table-compact w-full'>
                    <thead className='rounded-none'>
                        <tr className='rounded-none'>
                            <th className='rounded-none w-1/2'> Player </th>
                            <th> G </th>
                            <th> A </th>
                            <th> P </th>
                            <th> S </th>
                            <th> BLK </th>
                            <th> TOI </th>
                        </tr>
                    </thead>
                    <tbody>
                        {homeTeam?.filter(hasPlayed).map((player, index) =>
                            <tr key={index} className="hover" id={player.person.id}>
                                <td>{player?.person?.fullName}</td>
                                <td>{player?.stats?.skaterStats?.goals}</td>
                                <td>{player?.stats?.skaterStats?.assists}</td>
                                <td>{player?.stats?.skaterStats?.assists + player?.stats?.skaterStats?.goals}</td>
                                <td>{player?.stats?.skaterStats?.shots}</td>
                                <td>{player?.stats?.skaterStats?.blocked}</td>
                                <td>{player?.stats?.skaterStats?.timeOnIce}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <table className='table table-compact w-full'>
                    <thead>
                        <tr>
                            <th className='rounded-none w-1/2'> Goalie </th>
                            <th> EV </th>
                            <th> PP </th>
                            <th> SH </th>
                            <th> SAVES-SHOTS </th>
                            <th> SV% </th>
                            <th> TOI </th>
                        </tr>
                    </thead>
                    <tbody>
                    {homeTeam?.filter(goaliePlayed).map((player, index) =>
                        <tr key={index} className="hover" id={player.person.id}>
                            <td>{player?.person?.fullName}</td>
                            <td>{player?.stats?.goalieStats?.evenSaves}</td>
                            <td>{player?.stats?.goalieStats?.powerPlaySaves}</td>
                            <td>{player?.stats?.goalieStats?.shortHandedSaves}</td>
                            <td>{player?.stats?.goalieStats?.saves}-{player?.stats?.goalieStats?.shots}</td>
                            <td>{player?.stats?.goalieStats?.savePercentage.toFixed(2)}</td>
                            <td>{player?.stats?.goalieStats?.timeOnIce}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div> ) : (
            <div>
                <table className='table table-compact w-full'>
                    <thead>
                        <tr>
                            <th className='rounded-none w-1/2'> Player </th>
                            <th> G </th>
                            <th> A </th>
                            <th> P </th>
                            <th> S </th>
                            <th> BLK </th>
                            <th className='rounded-none'> TOI </th>
                        </tr>
                    </thead>
                    <tbody>
                    {awayTeam?.filter(hasPlayed).map((player, index) =>
                        <tr key={index} className="hover" id={player.person.id}>
                            <td className='rounded-none'>{player?.person?.fullName}</td>
                            <td>{player?.stats?.skaterStats?.goals}</td>
                            <td>{player?.stats?.skaterStats?.assists}</td>
                            <td>{player?.stats?.skaterStats?.assists + player?.stats?.skaterStats?.goals}</td>
                            <td>{player?.stats?.skaterStats?.shots}</td>
                            <td>{player?.stats?.skaterStats?.blocked}</td>
                            <td className='rounded-none'>{player?.stats?.skaterStats?.timeOnIce}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <table className='table table-compact w-full'>
                    <thead>
                        <tr>
                            <th className='rounded-none w-1/2'> Goalie </th>
                            <th> EV </th>
                            <th> PP </th>
                            <th> SH </th>
                            <th> SAVES-SHOTS </th>
                            <th> SV% </th>
                            <th className='rounded-none'> TOI </th>
                        </tr>
                    </thead>
                    <tbody>
                        {awayTeam?.filter(goaliePlayed).map((player, index) =>
                            <tr key={index} className="hover" id={player.person.id}>
                                <td>{player?.person?.fullName}</td>
                                <td>{player?.stats?.goalieStats?.evenSaves}</td>
                                <td>{player?.stats?.goalieStats?.powerPlaySaves}</td>
                                <td>{player?.stats?.goalieStats?.shortHandedSaves}</td>
                                <td>{player?.stats?.goalieStats?.shots}-{player?.stats?.goalieStats?.saves}</td>
                                <td>{player?.stats?.goalieStats?.savePercentage.toFixed(2)}</td>
                                <td>{player?.stats?.goalieStats?.timeOnIce}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div> 
        )}
        </div>
    )
}