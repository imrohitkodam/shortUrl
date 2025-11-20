
import React, { useState, useEffect, useCallback } from 'react';
import { Link as LinkType } from '../types';
import { api } from '../services/api';
import AddLinkForm from './AddLinkForm';
import LinkTable from './LinkTable';
import Toast from './ui/Toast';

const Dashboard: React.FC = () => {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getLinks();
      setLinks(data);
    } catch (err) {
      setError('Failed to fetch links. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);
  
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLinkCreated = (newLink: LinkType) => {
    setLinks(prev => [newLink, ...prev]);
    showToast('Link created successfully!');
  };

  const handleLinkDeleted = (code: string) => {
    setLinks(prev => prev.filter(link => link.code !== code));
    showToast('Link deleted successfully!');
  };

  return (
    <div className="space-y-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AddLinkForm onLinkCreated={handleLinkCreated} showToast={showToast} />
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">My Links</h2>
        </div>
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading links...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : (
          <LinkTable links={links} onLinkDeleted={handleLinkDeleted} showToast={showToast} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
