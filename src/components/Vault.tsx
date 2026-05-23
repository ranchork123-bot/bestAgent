import React, { useState } from 'react';

interface Credential {
  id: string;
  domain: string;
  username: string;
  passwordEncrypted: string; // Mocking encryption
}

export const Vault: React.FC = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [domain, setDomain] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain || !username || !password) return;

    const newCred: Credential = {
      id: crypto.randomUUID(),
      domain,
      username,
      // In a real app, this would be symmetrically encrypted before storing
      passwordEncrypted: btoa(password),
    };

    setCredentials([...credentials, newCred]);
    setDomain('');
    setUsername('');
    setPassword('');
  };

  const handleRemove = (id: string) => {
    setCredentials(credentials.filter(c => c.id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">API Vault & Credential Manager</h2>

      <form onSubmit={handleSave} className="mb-8 border-b pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="domain">
              Domain
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="domain"
              type="text"
              placeholder="github.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="user@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save Credential
          </button>
        </div>
      </form>

      <div>
        <h3 className="text-lg font-semibold mb-4">Stored Credentials</h3>
        {credentials.length === 0 ? (
          <p className="text-gray-500 italic">No credentials stored yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {credentials.map(cred => (
              <li key={cred.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{cred.domain}</p>
                  <p className="text-sm text-gray-500">{cred.username}</p>
                </div>
                <button
                  onClick={() => handleRemove(cred.id)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
