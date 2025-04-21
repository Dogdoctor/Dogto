import { useState } from 'react';
import ResponseForm from './ResponseForm';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';

function RespondentPortal() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSuccess = () => {
    setIsSuccess(true);
    setError(null);
  };

  const handleError = (error: Error) => {
    setError(error);
    setIsSuccess(false);
  };

  const handleClose = () => {
    setIsSuccess(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Survey Response Portal</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please fill out the form below with your information.
        </p>
      </div>

      {error && (
        <ErrorMessage 
          message={error.message || 'An error occurred while submitting your response. Please try again.'} 
          onClose={() => setError(null)} 
        />
      )}

      {isSuccess ? (
        <SuccessMessage onClose={handleClose} />
      ) : (
        <ResponseForm onSuccess={handleSuccess} onError={handleError} />
      )}
    </div>
  );
}

export default RespondentPortal;