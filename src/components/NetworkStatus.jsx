import { useState, useEffect } from 'react';

export default function NetworkStatus() {
  const [status, setStatus] = useState('connected'); // 'connected', 'disconnected', 'syncing'
  const [latency, setLatency] = useState(45); // mock latency in ms
  const [blockNumber, setBlockNumber] = useState(18574392); // mock block number
  
  useEffect(() => {
    // Simulate random network status changes
    const simulateNetworkChanges = () => {
      const rand = Math.random();
      
      if (rand < 0.9) {
        // 90% chance to be connected
        setStatus('connected');
        // Set random latency between 10-100ms
        setLatency(Math.floor(Math.random() * 90) + 10);
        // Increment block number occasionally
        if (Math.random() > 0.5) {
          setBlockNumber(prev => prev + 1);
        }
      } else if (rand < 0.95) {
        // 5% chance to be syncing
        setStatus('syncing');
      } else {
        // 5% chance to be disconnected
        setStatus('disconnected');
      }
    };
    
    // Update network status every 5 seconds
    const interval = setInterval(simulateNetworkChanges, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Visual elements based on status
  const getStatusIndicator = () => {
    switch (status) {
      case 'connected':
        return (
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <span className="text-green-500 font-medium">Connected</span>
          </div>
        );
      case 'syncing':
        return (
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2 animate-pulse"></div>
            <span className="text-yellow-500 font-medium">Syncing</span>
          </div>
        );
      case 'disconnected':
        return (
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
            <span className="text-red-500 font-medium">Disconnected</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center">
        {getStatusIndicator()}
      </div>
      
      {status !== 'disconnected' && (
        <div className="flex items-center">
          <div className="text-gray-400 text-sm mr-4">
            Latency: <span className="text-white font-medium">{latency}ms</span>
          </div>
          <div className="text-gray-400 text-sm">
            Block: <span className="text-white font-medium">#{blockNumber}</span>
          </div>
        </div>
      )}
    </div>
  );
}