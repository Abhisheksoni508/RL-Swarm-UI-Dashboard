import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import DateRangeSelector from './DateRangeSelector';

// Generate mock data for rewards over time
const generateRewardsData = (days = 30) => {
  const data = [];
  let cumulativeRewards = 0;
  
  for (let i = 0; i < days; i++) {
    // Generate a daily reward between 0.1 and 0.3 ETH
    const dailyReward = (Math.random() * 0.2 + 0.1).toFixed(2);
    cumulativeRewards += parseFloat(dailyReward);
    
    data.push({
      day: i + 1,
      dailyReward: dailyReward,
      totalRewards: cumulativeRewards.toFixed(2)
    });
  }
  
  return data;
};

export default function RewardsChart() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [range, setRange] = useState('30d');
  
  useEffect(() => {
    // Generate 60 days of data
    const generatedData = generateRewardsData(60);
    setAllData(generatedData);
    
    // Set initial visible data based on range
    filterDataByRange(generatedData, '30d');
    
    // Update data every 5 seconds
    const interval = setInterval(() => {
      setAllData(prev => {
        const last = prev[prev.length - 1];
        const dailyReward = (Math.random() * 0.2 + 0.1).toFixed(2);
        const totalRewards = (parseFloat(last.totalRewards) + parseFloat(dailyReward)).toFixed(2);
        
        const newData = [...prev];
        newData.push({
          day: last.day + 1,
          dailyReward: dailyReward,
          totalRewards: totalRewards
        });
        
        // Keep only the last 60 days
        if (newData.length > 60) {
          newData.shift();
        }
        
        // Update the visible data based on the current range
        filterDataByRange(newData, range);
        
        return newData;
      });
    }, 5000);
    
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
        <h3 className="text-lg font-semibold text-white">Rewards Over Time</h3>
        <DateRangeSelector onRangeChange={handleRangeChange} />
      </div>
      
      <div style={{ height: '250px', width: '100%' }}>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
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
                dataKey="dailyReward" 
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorDaily)"
                name="Daily Rewards (ETH)"
              />
              <Area 
                type="monotone" 
                dataKey="totalRewards" 
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorTotal)"
                name="Total Rewards (ETH)"
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