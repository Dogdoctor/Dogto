import { useState } from 'react';
import PasswordGate from './PasswordGate';
import ResponseTable from './ResponseTable';

// The password for the Surveyor Portal
const SURVEYOR_PASSWORD = '4268';

function SurveyorPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleCorrectPassword = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Survey Management</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {isAuthenticated 
            ? 'View and manage all survey responses.' 
            : 'Enter the password to access the surveyor portal.'
          }
        </p>
      </div>

      {isAuthenticated ? (
        <ResponseTable />
      ) : (
        <PasswordGate 
          password={SURVEYOR_PASSWORD} 
          onCorrectPassword={handleCorrectPassword} 
        />
      )}
    </div>
  );
}

export default SurveyorPortal;