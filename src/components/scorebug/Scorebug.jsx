export default function Scorebug({home, away}){
  return <div className="stats shadow max-h-28 overflow-visible m-4">
    <div className="stat">
      <div className="stat-title">{away.name}</div>
      <div className="stat-value">{away.goals}</div>
      <div className="stat-desc">{away.shots} shots</div>
    </div>
    <div className="stat">
      <div className="stat-title">{home.name}</div>
      <div className="stat-value">{home.goals}</div>
      <div className="stat-desc">{home.shots} shots</div>
    </div>
  </div>
}