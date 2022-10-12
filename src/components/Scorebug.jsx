export default function Scorebug({home, away}){

    return <div className="stats shadow bg-primary text-primary-content">
    
    <div className="stat">
      <div className="stat-title">{away.name}</div>
      <div className="stat-value">{away.goals}</div>
      <div className="stat-desc">{away.shots} shots</div>
    </div>

    <div className="stat">
      <div className="stat-title tex">{home.name}</div>
      <div className="stat-value">{home.goals}</div>
      <div className="stat-desc">{home.shots} shots</div>
    </div>
    
  </div>
}