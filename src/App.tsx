import { useState } from 'react';
import { Vault } from './components/Vault';
import { PlanReview } from './components/PlanReview';
import type { PlanStep } from './components/PlanReview';

function App() {
  const [activeTab, setActiveTab] = useState<'vault' | 'plan'>('vault');

  const initialPlan: PlanStep[] = [
    { id: '1', action: 'navigate', description: 'Go to https://example.com' },
    { id: '2', action: 'extract', description: 'Extract all the main headings' },
    { id: '3', action: 'summary', description: 'Summarize the headings' }
  ];

  const handleExecutePlan = (plan: PlanStep[]) => {
    console.log('Executing plan:', plan);
    alert('Plan execution started! Check console.');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Hubtique OS</h1>
          <p className="text-lg text-gray-600">Free, Local AI Browser Agent</p>
        </div>

        <div className="flex space-x-4 mb-6 justify-center">
          <button
            className={`px-4 py-2 rounded-md font-medium ${activeTab === 'vault' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm'}`}
            onClick={() => setActiveTab('vault')}
          >
            Vault & Credentials
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium ${activeTab === 'plan' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm'}`}
            onClick={() => setActiveTab('plan')}
          >
            Plan Review
          </button>
        </div>

        {activeTab === 'vault' && <Vault />}
        {activeTab === 'plan' && <PlanReview initialPlan={initialPlan} onExecute={handleExecutePlan} />}
      </div>
    </div>
  );
}

export default App;
