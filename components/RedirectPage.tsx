
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

interface RedirectPageProps {
  code: string;
}

const RedirectPage: React.FC<RedirectPageProps> = ({ code }) => {
  const [error, setError] = useState<string | null>(null);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const handleRedirect = async () => {
      try {
        const link = await api.recordClick(code);
        if (isMounted) {
          setTargetUrl(link.target_url);
          window.location.replace(link.target_url);
        }
      } catch (err) {
        if (isMounted) {
          setError(`The link for code "${code}" was not found.`);
        }
      }
    };
    handleRedirect();
    
    return () => {
      isMounted = false;
    };
  }, [code]);

  if (error) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-red-600">Link Not Found</h1>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="text-center p-8">
      <h1 className="text-xl font-semibold">Redirecting...</h1>
      <p className="text-gray-500 mt-2">Please wait, we're sending you to:</p>
      <p className="text-indigo-600 break-all">{targetUrl || 'your destination'}</p>
    </div>
  );
};

export default RedirectPage;
