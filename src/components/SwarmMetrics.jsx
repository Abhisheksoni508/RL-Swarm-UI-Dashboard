import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Generate mock data for swarm metrics
const generateSwarmData = () => {
  // Create metrics for the collective swarm and 5 individual nodes
  return {
    performanceMetrics: [
      { name: 'Training Speed', 'This Node': 68, 'Swarm Average': 72, 'Top Node': 91 },
      { name: 'Accuracy', 'This Node': 76, 'Swarm Average': 82, 'Top Node': 89 },
      { name: 'Convergence', 'This Node': 64, 'Swarm Average': 77, 'Top Node': 94 },
      { name: 'Reward Rate', 'This Node': 72, 'Swarm Average': 70, 'Top Node': 86 },
      { name: 'Energy Efficiency', 'This Node': 81, 'Swarm Average': 68, 'Top Node': 83 }
    ],
    
    // Data showing this node's contribution to the swarm
    contributionData: [
      { category: 'Task Completion', value: 78 },
      { category: 'Parameter Quality', value: 72 },
      { category: 'Network Reliability', value: 91 },
      { category: 'Data Diversity', value: 63 },
      { category: 'Compute Contribution', value: 84 }
    ],
    
    // Swarm size and health statistics
    swarmStats: {
      totalNodes: 42,
      activeNodes: 37,
      avgUptime: "96.3%",
      consensusRate: "99.1%",
      swarmEfficiency: "83.2%"
    }
  };
};

export default function SwarmMetrics({ compact = false }) {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('performance');
  
  useEffect(() => {
    // Set initial data
    setData(generateSwarmData());
    
    // Update data every 10 seconds (less frequently than other charts)
    const interval = setInterval(() => {
      setData(prevData => {
        if (!prevData) return generateSwarmData();
        
        // Create slightly modified data for updates
        const newData = { ...prevData };
        
        // Update performance metrics
        newData.performanceMetrics = prevData.performanceMetrics.map(metric => ({
          ...metric,
          'This Node': Math.min(100, Math.max(50, metric['This Node'] + (Math.random() * 6 - 3))),
          'Swarm Average': Math.min(100, Math.max(60, metric['Swarm Average'] + (Math.random() * 4 - 2))),
          'Top Node': Math.min(100, Math.max(80, metric['Top Node'] + (Math.random() * 4 - 1.5)))
        }));
        
        // Update contribution data
        newData.contributionData = prevData.contributionData.map(item => ({
          ...item,
          value: Math.min(100, Math.max(50, item.value + (Math.random() * 8 - 4)))
        }));
        
        // Update swarm stats
        const activeChange = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        newData.swarmStats = {
          ...prevData.swarmStats,
          activeNodes: prevData.swarmStats.activeNodes + activeChange,
          avgUptime: (parseFloat(prevData.swarmStats.avgUptime) + (Math.random() * 0.4 - 0.2)).toFixed(1) + "%",
          consensusRate: (parseFloat(prevData.swarmStats.consensusRate) + (Math.random() * 0.2 - 0.1)).toFixed(1) + "%",
          swarmEfficiency: (parseFloat(prevData.swarmStats.swarmEfficiency) + (Math.random() * 0.6 - 0.3)).toFixed(1) + "%"
        };
        
        return newData;
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (!data) {
    return <div className="bg-gray-800 p-4 rounded-lg mt-6 text-center text-gray-400">Loading swarm metrics...</div>;
  }
  
  // When in compact mode, show a simplified version optimized for grid layout
  if (compact) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg h-full">
        <h3 className="text-lg font-semibold text-white mb-3">Swarm Overview</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-900 p-2 rounded">
            <div className="text-gray-400 text-xs">Active Nodes</div>
            <div className="text-green-500 text-xl font-bold">{data.swarmStats.activeNodes}/{data.swarmStats.totalNodes}</div>
          </div>
          <div className="bg-gray-900 p-2 rounded">
            <div className="text-gray-400 text-xs">Efficiency</div>
            <div className="text-white text-xl font-bold">{data.swarmStats.swarmEfficiency}</div>
          </div>
        </div>
        
        <div className="h-40 mb-3">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={data.contributionData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Radar
                name="Node Contribution"
                dataKey="value"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="text-xs text-gray-400 text-center">
          Your contribution to collective swarm intelligence
        </div>
      </div>
    );
  }
  
  // Full version with tabs
  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-6">
      <h3 className="text-lg font-semibold text-white mb-2">Swarm Performance Metrics</h3>
      
      {/* Tab navigation */}
      <div className="flex border-b border-gray-700 mb-4">
        <button 
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'performance' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance Comparison
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'contribution' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('contribution')}
        >
          Node Contribution
        </button>
        <button 
          className={`px-4 py-2 text-sm font-medium ${activeTab === 'stats' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
          onClick={() => setActiveTab('stats')}
        >
          Swarm Stats
        </button>
      </div>
      
      {/* Tab content */}
      <div className="h-80">
        {activeTab === 'performance' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.performanceMetrics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
              <YAxis 
                tick={{ fill: '#94a3b8' }} 
                domain={[0, 100]}
                label={{ value: 'Score', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar dataKey="This Node" fill="#60a5fa" name="This Node" />
              <Bar dataKey="Swarm Average" fill="#10b981" name="Swarm Average" />
              <Bar dataKey="Top Node" fill="#f59e0b" name="Top Node" />
            </BarChart>
          </ResponsiveContainer>
        )}
        
        {activeTab === 'contribution' && (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={data.contributionData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#94a3b8' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8' }} />
              <Radar
                name="Node Contribution"
                dataKey="value"
                stroke="#60a5fa"
                fill="#60a5fa"
                fillOpacity={0.6}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
                formatter={(value) => [`${value}%`, 'Contribution']}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
        
        {activeTab === 'stats' && (
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Total Nodes</div>
              <div className="text-white text-2xl font-bold mt-1">{data.swarmStats.totalNodes}</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Active Nodes</div>
              <div className="text-green-500 text-2xl font-bold mt-1">{data.swarmStats.activeNodes}</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Average Uptime</div>
              <div className="text-white text-2xl font-bold mt-1">{data.swarmStats.avgUptime}</div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="text-gray-400 text-sm">Consensus Rate</div>
              <div className="text-white text-2xl font-bold mt-1">{data.swarmStats.consensusRate}</div>
            </div>
            <div className="bg-gray-900 p-4 col-span-2 rounded-lg">
              <div className="text-gray-400 text-sm">Swarm Efficiency</div>
              <div className="text-white text-2xl font-bold mt-1">{data.swarmStats.swarmEfficiency}</div>
              <div className="h-4 bg-gray-700 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                  style={{ width: data.swarmStats.swarmEfficiency }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-3 text-sm text-gray-400">
        {activeTab === 'performance' && (
          <p>Compare your node's performance against swarm averages and top performers across key metrics.</p>
        )}
        {activeTab === 'contribution' && (
          <p>Visualize how your node contributes to the collective swarm across different categories.</p>
        )}
        {activeTab === 'stats' && (
          <p>View real-time statistics about the overall swarm health and participation.</p>
        )}
      </div>
    </div>
  );
}