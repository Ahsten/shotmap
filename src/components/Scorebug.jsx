import { useEffect } from "react";
import { useState } from "react";
import Shotmap from "./Shotmap";

export default function Scorebug({home, away}){

    return <div className="stats stats-vertical lg:stats-horizontal shadow bg-primary text-primary-content self-start">
  
    <div className="stat">
      <div className="stat-title tex">{home.name}</div>
      <div className="stat-value">{home.goals}</div>
    </div>
    
    <div className="stat">
      <div className="stat-title">{away.name}</div>
      <div className="stat-value">{away.goals}</div>
    </div>
    
  </div>
}