import { useState } from 'react';
import { submitResponse } from '../../lib/supabase';

type FormData = {
  name: string;
  age: string;
};

type FormErrors = {
  name?: string;
  age?: string;
};

type ResponseFormProps = {
  onSuccess: () => void;
  onError: (error: Error) => void;
};

function ResponseForm({ onSuccess, onError }: ResponseFormProps) {
  const [formData, setFormData] = useState<FormData>({ name: '', age: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = 'Age must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is being edited
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await submitResponse(
        formData.name,
        Number(formData.age)
      );
      
      if (error) {
        throw error;
      }
      
      // Reset form
      setFormData({ name: '', age: '' });
      onSuccess();
    } catch (error) {
      onError(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Submit Your Response</h2>
      
      <div className="mb-4">
        <label 
          htmlFor="name" 
          className="block text-gray-700 font-medium mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition
            ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label 
          htmlFor="age" 
          className="block text-gray-700 font-medium mb-2"
        >
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          min="1"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition
            ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Enter your age"
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition
          ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Response'}
      </button>
    </form>
  );
}

export default ResponseForm;