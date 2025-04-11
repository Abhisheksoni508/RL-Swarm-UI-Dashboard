import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import DateRangeSelector from './DateRangeSelector';

const generateMockData = (days = 30) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    data.push({
      day: i + 1,
      tasks: Math.floor(Math.random() * 10) + 35, // Baseline ~40
      rewards: (Math.random() * 2 + 4).toFixed(1) // Baseline ~5 ETH
    });
  }
  return data;
};

export default function PerformanceChart() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [range, setRange] = useState('30d');
  
  // Generate all data on initial load
  useEffect(() => {
    const generatedData = generateMockData(60); // Generate 60 days of data
    setAllData(generatedData);
    
    // Set initial visible data based on range
    filterDataByRange(generatedData, '30d');
    
    // Simulate live updates every 3 seconds
    const interval = setInterval(() => {
      setAllData(prev => {
        const last = prev[prev.length - 1];
        const newData = [...prev];
        newData.push({
          day: last.day + 1,
          tasks: Math.max(0, last.tasks + Math.floor(Math.random() * 6 - 2)),
          rewards: Math.max(0, (parseFloat(last.rewards) + (Math.random() * 0.6 - 0.3)).toFixed(1))
        });
        
        // Keep only the last 60 days
        if (newData.length > 60) {
          newData.shift();
        }
        
        // Update the visible data based on the current range
        filterDataByRange(newData, range);
        
        return newData;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Filter data when range changes
  const filterDataByRange = (sourceData, rangeValue) => {
    let filteredData;
    
    switch(rangeValue) {
      case '7d':
        filteredData = sourceData.slice(-7);
        break;
      case '14d':
        filteredData = sourceData.slice(-14);
        break;
      case '30d':
        filteredData = sourceData.slice(-30);
        break;
      case 'all':
      default:
        filteredData = [...sourceData];
        break;
    }
    
    setData(filteredData);
  };

  const handleRangeChange = (newRange) => {
    setRange(newRange);
    filterDataByRange(allData, newRange);
  };

  return (
    <div className="chart-container bg-gray-800 p-4 rounded-lg mt-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-white">Performance Over Time</h3>
        <DateRangeSelector onRangeChange={handleRangeChange} />
      </div>
      
      <div style={{ height: '250px', width: '100%' }}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRewards" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: '#94a3b8' }} />
              <YAxis tick={{ fill: '#94a3b8' }} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1e293b',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  color: '#fff'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="tasks" 
                stroke="#60a5fa"
                fillOpacity={1}
                fill="url(#colorTasks)"
                animationDuration={2000}
                name="Tasks"
              />
              <Area 
                type="monotone" 
                dataKey="rewards" 
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorRewards)"
                animationDuration={2000}
                name="Rewards (ETH)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            Loading chart data...
          </div>
        )}
      </div>
    </div>
  );
}