
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Link } from '../types';
import { api } from '../services/api';
import { ExternalLinkIcon } from './Icons';

const StatsPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [link, setLink] = useState<Link | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (code) {
      api.getLinkByCode(code)
        .then(setLink)
        .catch(() => setError('Link not found.'))
        .finally(() => setLoading(false));
    }
  }, [code]);
  
  if (loading) return <div className="text-center p-8">Loading stats...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!link) return <div className="text-center p-8">No link data found.</div>;
  
  const shortUrl = `${window.location.origin}${window.location.pathname}#/${link.code}`;

  const StatCard = ({ label, value }: { label: string; value: React.ReactNode }) => (
      <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
      </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="border-b pb-4 mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Statistics</h1>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{shortUrl}</a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard label="Total Clicks" value={link.clicks} />
                <StatCard label="Date Created" value={new Date(link.created_at).toLocaleString()} />
                <StatCard label="Last Clicked" value={link.last_clicked ? new Date(link.last_clicked).toLocaleString() : 'Never'} />
                <div className="bg-gray-100 p-4 rounded-lg md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Original URL</p>
                    <a href={link.target_url} target="_blank" rel="noopener noreferrer" className="mt-1 text-lg font-semibold text-gray-900 break-all hover:underline flex items-center space-x-1">
                        <span>{link.target_url}</span>
                        <ExternalLinkIcon className="w-4 h-4" />
                    </a>
                </div>
            </div>
            
            <div className="mt-6 text-center">
                <RouterLink to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    &larr; Back to Dashboard
                </RouterLink>
            </div>
        </div>
    </div>
  );
};

export default StatsPage;
