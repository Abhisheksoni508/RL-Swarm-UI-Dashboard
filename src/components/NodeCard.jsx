import './NodeCard.css'; // We'll create this file next

export default function NodeCard({ nodeData }) {
  return (
    <div className="node-card">
      <div className="card-header">
        <h1 className="card-title">
          Node: <span className="node-id">{nodeData.nodeId}</span>
        </h1>
        <span className="live-badge">LIVE</span>
      </div>

      <div className="stats-grid">
        <Stat label="Tasks Completed" value={nodeData.tasksCompleted} />
        <Stat label="Rewards Earned" value={nodeData.rewardsEarned} />
        <Stat label="Swarm Rank" value={nodeData.swarmRank} />
        <Stat label="Uptime" value={nodeData.uptime} />
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}