import { useState } from "react";
import NodeCard from "./components/NodeCard";
import PerformanceChart from "./components/PerformanceCharts";
import RewardsChart from "./components/RewardsChart";
import NetworkStatus from "./components/NetworkStatus";
import ModelComparison from "./components/ModelComparison";
import SwarmMetrics from "./components/SwarmMetrics";
import nodeData from "./data/nodes.json";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">RL Swarm Node View</h1>
        <div className="w-full md:w-auto mt-2 md:mt-0">
          <NetworkStatus />
        </div>
      </header>
      
      {/* Dashboard Grid Layout - Optimized to show key metrics in first view */}
      <main className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-7xl mx-auto">
        {/* Top Row - Key Metrics */}
        <div className="md:col-span-6 lg:col-span-4">
          <NodeCard nodeData={nodeData} />
        </div>
        
        <div className="md:col-span-6 lg:col-span-4">
          <SwarmMetrics compact={true} />
        </div>
        
        <div className="md:col-span-12 lg:col-span-4">
          <ModelComparison compact={true} />
        </div>
        
        {/* Middle Row - Performance Charts */}
        <div className="md:col-span-12 lg:col-span-6">
          <PerformanceChart />
        </div>
        
        <div className="md:col-span-12 lg:col-span-6">
          <RewardsChart />
        </div>
        
        {/* Bottom Row - Detailed Views */}
        <div className="md:col-span-12 lg:col-span-6">
          <SwarmMetrics />
        </div>
        
        <div className="md:col-span-12 lg:col-span-6">
          <ModelComparison />
        </div>
        
        {/* Explanation Section */}
        <div className="md:col-span-12 bg-gray-800 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">About This Dashboard</h3>
          <div className="text-gray-300 text-sm">
            <p className="mb-2">
              This dashboard visualizes how reinforcement learning models train more effectively when part of a collective swarm. 
              Individual node statistics are combined with swarm-wide metrics to demonstrate the advantages of decentralized training.
            </p>
            <p className="mb-2">
              The metrics shown highlight key aspects of Gensyn's research: how decentralized ML parameters distributed across 
              devices lead to faster learning and better model performance through collective swarm intelligence.
            </p>
            <p>
              Through this interface, you can compare your node's contribution to the overall swarm health, track model performance 
              across multiple swarms, and visualize the benefits of collective vs. individual training approaches.
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-4 text-center text-gray-500 text-sm">
        Dashboard Version 1.0 | Created for RL Swarm UI Hackathon
      </footer>
    </div>
  );
}