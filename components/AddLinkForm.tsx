
import React, { useState } from 'react';
import { api } from '../services/api';
import { Link } from '../types';

interface AddLinkFormProps {
  onLinkCreated: (newLink: Link) => void;
  showToast: (message: string, type: 'success' | 'error') => void;
}

const AddLinkForm: React.FC<AddLinkFormProps> = ({ onLinkCreated, showToast }) => {
  const [targetUrl, setTargetUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl) {
      setError('Please enter a URL to shorten.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      const newLink = await api.createLink({
        target_url: targetUrl,
        code: customCode || undefined,
      });
      onLinkCreated(newLink);
      setTargetUrl('');
      setCustomCode('');
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-700">
            Long URL
          </label>
          <div className="mt-1">
            <input
              type="url"
              name="targetUrl"
              id="targetUrl"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              placeholder="https://example.com/very/long/url/to/shorten"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="customCode" className="block text-sm font-medium text-gray-700">
            Custom Code (Optional)
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
             <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
              tinylink.io/
            </span>
            <input
              type="text"
              name="customCode"
              id="customCode"
              className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              placeholder="my-link (6-8 chars)"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              pattern="^[A-Za-z0-9]{6,8}$"
              title="Must be 6-8 alphanumeric characters."
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLinkForm;
