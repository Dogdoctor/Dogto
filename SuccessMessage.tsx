import { CheckCircle } from 'lucide-react';

type SuccessMessageProps = {
  onClose: () => void;
};

function SuccessMessage({ onClose }: SuccessMessageProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto text-center animate-fade-in">
      <div className="flex justify-center mb-4">
        <CheckCircle className="text-green-500" size={48} />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Thank You!</h2>
      <p className="text-gray-600 mb-6">
        Your response has been successfully submitted.
      </p>
      <button
        onClick={onClose}
        className="bg-blue-600 text-white py-2 px-6 rounded-md font-medium
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
      >
        Submit Another Response
      </button>
    </div>
  );
}

export default SuccessMessage;