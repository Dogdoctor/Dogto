import { AlertCircle, X } from 'lucide-react';

type ErrorMessageProps = {
  message: string;
  onClose: () => void;
};

function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md max-w-md mx-auto mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        <div>
          <button
            type="button"
            className="text-red-500 hover:text-red-600 focus:outline-none"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;