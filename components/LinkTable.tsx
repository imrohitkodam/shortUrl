
import React, { useState } from 'react';
import { Link as LinkType } from '../types';
import { ClipboardIcon, TrashIcon, ExternalLinkIcon } from './Icons';
import { Link as RouterLink } from 'react-router-dom';
import { api } from '../services/api';

interface LinkTableProps {
  links: LinkType[];
  onLinkDeleted: (code: string) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const LinkTable: React.FC<LinkTableProps> = ({ links, onLinkDeleted, showToast }) => {
  const [deletingCode, setDeletingCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    const shortUrl = `${window.location.origin}${window.location.pathname}#/${code}`;
    navigator.clipboard.writeText(shortUrl);
    showToast('Short URL copied to clipboard!');
  };
  
  const handleDelete = async (code: string) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      setDeletingCode(code);
      try {
        await api.deleteLink(code);
        onLinkDeleted(code);
      } catch (err) {
        showToast('Failed to delete link.', 'error');
      } finally {
        setDeletingCode(null);
      }
    }
  };

  if (links.length === 0) {
    return <p className="p-6 text-center text-gray-500">You haven't created any links yet.</p>;
  }

  const formatDate = (isoString: string | null) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleString();
  };
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Link</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original URL</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Clicked</th>
            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {links.map((link) => (
            <tr key={link.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <RouterLink to={`/${link.code}`} target="_blank" className="text-indigo-600 hover:text-indigo-900 font-medium">
                    tinylink.io/{link.code}
                  </RouterLink>
                  <button 
                    type="button"
                    onClick={() => copyToClipboard(link.code)} 
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    title="Copy Link"
                  >
                    <ClipboardIcon className="w-4 h-4" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a href={link.target_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-gray-500 hover:text-gray-800">
                  <span className="max-w-xs truncate">{link.target_url}</span>
                  <ExternalLinkIcon className="w-4 h-4" />
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <RouterLink to={`/stats/${link.code}`} className="hover:underline">{link.clicks}</RouterLink>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(link.last_clicked)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  type="button"
                  onClick={() => handleDelete(link.code)} 
                  className="text-red-600 hover:text-red-900 disabled:opacity-50 cursor-pointer"
                  disabled={deletingCode === link.code}
                  title="Delete Link"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkTable;
