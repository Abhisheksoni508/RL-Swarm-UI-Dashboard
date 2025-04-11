import { useState } from 'react';

export default function DateRangeSelector({ onRangeChange }) {
  const [range, setRange] = useState('30d'); // Default to 30 days
  
  const handleRangeChange = (newRange) => {
    setRange(newRange);
    onRangeChange(newRange);
  };
  
  return (
    <div className="flex items-center justify-end mb-2">
      <div className="text-sm text-gray-400 mr-2">Time Range:</div>
      <div className="flex bg-gray-900 rounded-md overflow-hidden">
        <button 
          className={`px-3 py-1 text-xs font-medium ${range === '7d' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          onClick={() => handleRangeChange('7d')}
        >
          7D
        </button>
        <button 
          className={`px-3 py-1 text-xs font-medium ${range === '14d' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          onClick={() => handleRangeChange('14d')}
        >
          14D
        </button>
        <button 
          className={`px-3 py-1 text-xs font-medium ${range === '30d' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          onClick={() => handleRangeChange('30d')}
        >
          30D
        </button>
        <button 
          className={`px-3 py-1 text-xs font-medium ${range === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          onClick={() => handleRangeChange('all')}
        >
          ALL
        </button>
      </div>
    </div>
  );
}