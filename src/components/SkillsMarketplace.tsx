import { useState } from 'react';

// FEATURE: Skills / task template marketplace
// /skills module with 100+ community templates

export const SkillsMarketplace = () => {
  const [skills] = useState([
    { id: 1, title: 'LinkedIn Profile Extractor', author: 'Hubtique', installs: 1240 },
    { id: 2, title: 'Email Inbox Agent (Lindy style)', author: 'Community', installs: 850 },
    { id: 3, title: 'Competitor Price Tracker', author: 'Hubtique', installs: 2100 },
  ]);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Skills Marketplace</h2>
      <p className="mb-4 text-gray-600">Install pre-built automation templates created by the community.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skills.map(skill => (
          <div key={skill.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg text-blue-600">{skill.title}</h3>
            <p className="text-sm text-gray-500 mt-1">By {skill.author}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-400">{skill.installs} installs</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                Install
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
