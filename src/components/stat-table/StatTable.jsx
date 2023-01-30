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

    return(
        <div className='shadow'>
            <div className="tabs tabs-boxed rounded-b-none flex flex-nowrap ">
                <a className={active ? "tab tab-active" : "tab"} onClick={() => setActive(true)}>{home?.name}</a> 
                <a className={active ? "tab" : "tab tab-active"} onClick={() => setActive(false)}>{away?.name}</a>
            </div>
        {active === true ? (
            <table className='table table-compact w-full'>
                <thead className='rounded-none'>
                    <tr className='rounded-none'>
                        <th data-testid='name' className='w-1/2 rounded-none'> Name </th>
                        <th data-testid='goals'> G </th>
                        <th data-testid='assists'> A </th>
                        <th data-testid='points'> P </th>
                        <th data-testid='time' className='rounded-none'> TOI </th>
                    </tr>
                </thead>
                <tbody>
                {homeTeam?.filter(hasPlayed).map((player, index) => 
                    <tr key={index} className="hover" id={player.person.id}>
                        <td>{player?.person?.fullName}</td>
                        <td>{player?.stats?.skaterStats?.goals}</td>
                        <td>{player?.stats?.skaterStats?.assists}</td>
                        <td>{player?.stats?.skaterStats?.assists + player?.stats?.skaterStats?.goals}</td>
                        <td>{player?.stats?.skaterStats?.timeOnIce}</td>
                    </tr>
                    )}
                </tbody>
            </table> ) : (
            <table className='table table-compact w-full'>
            <thead>
                <tr>
                    <th className='w-1/2 rounded-none'> Name </th>
                    <th> G </th>
                    <th> A </th>
                    <th> P </th>
                    <th className='rounded-none'> TOI </th>
                </tr>
            </thead>
            <tbody>
            {awayTeam?.filter(hasPlayed).map((player, index) => 
                <tr key={index} className="hover" id={player.person.id}>
                    <td>{player?.person?.fullName}</td>
                    <td>{player?.stats?.skaterStats?.goals}</td>
                    <td>{player?.stats?.skaterStats?.assists}</td>
                    <td>{player?.stats?.skaterStats?.assists + player?.stats?.skaterStats?.goals}</td>
                    <td>{player?.stats?.skaterStats?.timeOnIce}</td>
                </tr>
                )}
            </tbody>
        </table>    
        )}
        </div>
    )
}