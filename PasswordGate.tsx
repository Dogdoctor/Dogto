import { useState } from 'react';
import { Lock } from 'lucide-react';

type PasswordGateProps = {
  password: string;
  onCorrectPassword: () => void;
};

function PasswordGate({ password, onCorrectPassword }: PasswordGateProps) {
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputPassword === password) {
      onCorrectPassword();
    } else {
      setAttempts(attempts + 1);
      setError(`Incorrect password. ${3 - Math.min(attempts + 1, 3)} attempts remaining.`);
      
      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          <Lock className="text-blue-600" size={24} />
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold text-center mb-4">Surveyor Portal</h2>
      <p className="text-gray-600 text-center mb-6">
        Enter the password to access the survey responses.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Enter password"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition
              ${error ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          Access Portal
        </button>
      </form>
    </div>
  );
}

export default PasswordGate;