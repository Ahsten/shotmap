import {
    Card,
    Table,
    TableRow,
    TableHead,
    TableHeaderCell,
    TabList,
    Tab,
    TableBody,
    TableCell
} from '@tremor/react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function StatTable({id}){
    const [showCard, setShowCard] = useState("home")
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
                }
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
        <Card marginTop='mt-3'>
            <TabList defaultValue={"home"} handleSelect={(value) => setShowCard(value === 1)}>
                <Tab value={1} text={"Leafs"}></Tab>
                <Tab value={2} text={"Lightning"}></Tab>
            </TabList>
        {showCard === true ? (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell textAlignment='text-center'> Name </TableHeaderCell>
                        <TableHeaderCell textAlignment='text-center'> Goals </TableHeaderCell>
                        <TableHeaderCell textAlignment='text-center'> Assists </TableHeaderCell>
                        <TableHeaderCell textAlignment='text-center'> Points </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {homeTeam?.filter(hasPlayed).map((player, index) => 
                    <TableRow key={index}>
                        <TableCell textAlignment='text-center'>{player?.person?.fullName}</TableCell>
                        <TableCell textAlignment='text-center'>{player?.stats?.skaterStats?.goals}</TableCell>
                        <TableCell textAlignment='text-center'>{player?.stats?.skaterStats?.assists}</TableCell>
                        <TableCell textAlignment='text-center'>{player?.stats?.skaterStats?.assists + player?.stats?.skaterStats?.goals}</TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table> ) : (
            <Table>
            <TableHead>
                <TableRow>
                    <TableHeaderCell textAlignment='text-center'> Name </TableHeaderCell>
                    <TableHeaderCell textAlignment='text-center'> Goals </TableHeaderCell>
                    <TableHeaderCell textAlignment='text-center'> Assists </TableHeaderCell>
                    <TableHeaderCell textAlignment='text-center'> Points </TableHeaderCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {awayTeam?.filter(hasPlayed).map((player, index) => 
                <TableRow key={index}>
                    <TableCell textAlignment='text-center'>{player?.person?.fullName}</TableCell>
                    <TableCell textAlignment='text-center'>{player?.stats?.skaterStats?.goals}</TableCell>
                    <TableCell textAlignment='text-center'>{player?.stats?.skaterStats?.assists}</TableCell>
                    <TableCell textAlignment='text-center'>{player?.stats?.skaterStats?.assists + player?.stats?.skaterStats?.goals}</TableCell>
                </TableRow>
                )}
            </TableBody>
        </Table>    
        )}
        </Card>
    )
}