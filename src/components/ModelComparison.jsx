import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Generate mock data for multiple models across different swarms
const generateModelComparisonData = () => {
  const data = [];
  
  for (let i = 0; i < 20; i++) {
    const dataPoint = {
      epoch: i + 1,
      // Model A performs well in early epochs but plateaus
      "Model A": 70 + Math.min(20, i * 1.2) + (Math.random() * 5 - 2.5),
      // Model B starts slower but outperforms in later epochs
      "Model B": 65 + Math.min(30, i * 1.5) + (Math.random() * 5 - 2.5),
      // Model C is consistently average
      "Model C": 75 + Math.min(15, i * 0.8) + (Math.random() * 5 - 2.5),
      // Collective Swarm performance (better than any individual model)
      "Collective Swarm": 75 + Math.min(35, i * 1.7) + (Math.random() * 3 - 1.5)
    };
    
    data.push(dataPoint);
  }
  
  return data;
};

export default function ModelComparison({ compact = false }) {
  const [data, setData] = useState([]);
  const [selectedModels, setSelectedModels] = useState({
    "Model A": true,
    "Model B": true,
    "Model C": true,
    "Collective Swarm": true
  });
  
  useEffect(() => {
    setData(generateModelComparisonData());
    
    // Simulate updates every 8 seconds
    const interval = setInterval(() => {
      setData(prev => {
        if (prev.length === 0) return prev;
        
        const newData = [...prev];
        const last = newData[newData.length - 1];
        
        // Add new epoch
        newData.push({
          epoch: last.epoch + 1,
          "Model A": Math.min(95, last["Model A"] + (Math.random() * 2 - 0.5)),
          "Model B": Math.min(98, last["Model B"] + (Math.random() * 2.5 - 0.5)),
          "Model C": Math.min(92, last["Model C"] + (Math.random() * 1.8 - 0.4)),
          "Collective Swarm": Math.min(99, last["Collective Swarm"] + (Math.random() * 2.8 - 0.2))
        });
        
        // Keep only the last 20 points
        if (newData.length > 20) {
          return newData.slice(-20);
        }
        
        return newData;
      });
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const toggleModel = (model) => {
    setSelectedModels(prev => ({
      ...prev,
      [model]: !prev[model]
    }));
  };
  
  // Define colors for each model
  const modelColors = {
    "Model A": "#60a5fa", // blue
    "Model B": "#f97316", // orange
    "Model C": "#a855f7", // purple
    "Collective Swarm": "#10b981" // green
  };
  
  // For compact view, prioritize showing just Collective Swarm vs individual models
  const compactSelectedModels = {
    "Model A": true,
    "Model B": false,
    "Model C": false, 
    "Collective Swarm": true
  };
  
  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Model Performance</h3>
        
        {!compact && (
          <div className="flex space-x-2 flex-wrap">
            {Object.keys(selectedModels).map(model => (
              <button
                key={model}
                onClick={() => toggleModel(model)}
                className={`px-2 py-1 text-xs rounded-full font-medium flex items-center ${
                  selectedModels[model] 
                    ? `bg-opacity-20 bg-${modelColors[model].replace('#', '')} text-${modelColors[model].replace('#', '')}`
                    : 'bg-gray-700 text-gray-400'
                }`}
                style={{ 
                  backgroundColor: selectedModels[model] ? `${modelColors[model]}20` : '',
                  color: selectedModels[model] ? modelColors[model] : ''
                }}
              >
                <span 
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: modelColors[model] }}
                ></span>
                {model}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ height: compact ? '220px' : '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="epoch" 
              tick={{ fill: '#94a3b8' }}
              label={compact ? null : { value: 'Training Epochs', position: 'insideBottomRight', offset: -10, fill: '#94a3b8' }}
            />
            <YAxis 
              tick={{ fill: '#94a3b8' }}
              label={compact ? null : { value: 'Accuracy (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
              domain={[60, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b',
                borderColor: '#334155',
                borderRadius: '0.5rem',
                color: '#fff'
              }}
            />
            {!compact && <Legend />}
            
            {/* In compact mode, just show Model A and Collective Swarm */}
            {compact ? (
              <>
                <Line 
                  type="monotone" 
                  dataKey="Model A" 
                  stroke={modelColors["Model A"]} 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  name="Individual Model"
                />
                <Line 
                  type="monotone" 
                  dataKey="Collective Swarm" 
                  stroke={modelColors["Collective Swarm"]} 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </>
            ) : (
              // Full view with all selected models
              <>
                {selectedModels["Model A"] && (
                  <Line 
                    type="monotone" 
                    dataKey="Model A" 
                    stroke={modelColors["Model A"]} 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
                {selectedModels["Model B"] && (
                  <Line 
                    type="monotone" 
                    dataKey="Model B" 
                    stroke={modelColors["Model B"]} 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
                {selectedModels["Model C"] && (
                  <Line 
                    type="monotone" 
                    dataKey="Model C" 
                    stroke={modelColors["Model C"]} 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
                {selectedModels["Collective Swarm"] && (
                  <Line 
                    type="monotone" 
                    dataKey="Collective Swarm" 
                    stroke={modelColors["Collective Swarm"]} 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )}
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {!compact && (
        <div className="mt-3 text-sm text-gray-400">
          <p>This chart demonstrates how models perform across different swarms compared to collective swarm intelligence.</p>
          <p>The dashed green line shows the power of collective training, consistently outperforming individual models.</p>
        </div>
      )}
      
      {compact && (
        <div className="mt-2 text-xs text-gray-400 text-center">
          Collective swarm training outperforms individual models
        </div>
      )}
    </div>
  );
}