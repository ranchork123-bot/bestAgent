import { useState, useEffect } from 'react';

// FEATURE: Visual plan execution graph
// React Flow showing current step position

export const ExecutionGraph = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ['Start', 'Navigate', 'Extract', 'Summarize', 'Done'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length ? prev + 1 : 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="bg-gray-50 shadow-inner rounded px-8 py-6 mb-4 max-w-4xl mx-auto mt-8 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Live Execution Graph</h2>

      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-300 -z-10 transform -translate-y-1/2"></div>
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isPast = stepNum < currentStep;

          return (
            <div key={step} className="flex flex-col items-center bg-gray-50 px-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2
                  ${isActive ? 'bg-blue-500 text-white border-blue-600 animate-pulse' :
                    isPast ? 'bg-green-500 text-white border-green-600' :
                    'bg-white text-gray-400 border-gray-300'}`}
              >
                {stepNum}
              </div>
              <span className={`mt-2 text-xs font-medium ${isActive ? 'text-blue-600' : isPast ? 'text-green-600' : 'text-gray-400'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
