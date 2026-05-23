import React, { useState } from 'react';

export interface PlanStep {
  id: string;
  action: string;
  description: string;
}

export interface PlanReviewProps {
  initialPlan: PlanStep[];
  onExecute: (plan: PlanStep[]) => void;
}

export const PlanReview: React.FC<PlanReviewProps> = ({ initialPlan, onExecute }) => {
  const [plan, setPlan] = useState<PlanStep[]>(initialPlan);

  const handleEdit = (id: string, newDescription: string) => {
    setPlan(plan.map(step => step.id === id ? { ...step, description: newDescription } : step));
  };

  const handleRemove = (id: string) => {
    setPlan(plan.filter(step => step.id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Review Execution Plan</h2>
      <ul className="mb-4">
        {plan.map((step, index) => (
          <li key={step.id} className="border-b py-2 flex items-center justify-between">
            <div className="flex-1">
              <span className="font-semibold text-gray-700 mr-2">{index + 1}.</span>
              <span className="text-gray-900 font-medium mr-2">[{step.action}]</span>
              <input
                type="text"
                value={step.description}
                onChange={(e) => handleEdit(step.id, e.target.value)}
                className="text-gray-600 border border-transparent hover:border-gray-300 focus:border-blue-500 rounded px-2 py-1 w-full max-w-lg outline-none transition-colors"
              />
            </div>
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={() => handleRemove(step.id)}
                className="text-red-500 hover:text-red-700 text-sm font-semibold"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      {plan.length === 0 && (
        <p className="text-gray-500 italic mb-4">No steps in the plan.</p>
      )}
      <button
        onClick={() => onExecute(plan)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full disabled:opacity-50"
        disabled={plan.length === 0}
      >
        Run Plan
      </button>
    </div>
  );
};
