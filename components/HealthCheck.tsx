
import React from 'react';

const HealthCheck: React.FC = () => {
  const healthStatus = {
    ok: true,
    version: '1.0',
    status: 'Simulated API is operational',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Health Check</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm">
        {JSON.stringify(healthStatus, null, 2)}
      </pre>
    </div>
  );
};

export default HealthCheck;
