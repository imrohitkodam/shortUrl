
import React from 'react';
import { Link } from 'react-router-dom';
import { LinkIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-primary shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-primary-foreground">
          <LinkIcon className="h-8 w-8 text-indigo-400" />
          <span className="text-2xl font-bold">TinyLink</span>
        </Link>
        <nav>
            <a href="https://github.com/aistudio-app/pro-proxy" target="_blank" rel="noopener noreferrer" className="text-primary-foreground hover:text-indigo-400 transition-colors">
                GitHub
            </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
