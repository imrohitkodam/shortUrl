
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-4xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-2">Page Not Found</h2>
      <p className="text-gray-500 mt-4">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
