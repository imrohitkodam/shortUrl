
import React from 'react';
import { HashRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import StatsPage from './components/StatsPage';
import RedirectPage from './components/RedirectPage';
import HealthCheck from './components/HealthCheck';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-secondary text-secondary-foreground font-sans">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stats/:code" element={<StatsPage />} />
            <Route path="/healthz" element={<HealthCheck />} />
            <Route path="/404" element={<NotFound />} />
            {/* The redirect route must be dynamic */}
            <Route path="/:code" element={<RedirectHandler />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

const RedirectHandler: React.FC = () => {
    const { code } = useParams<{ code: string }>();

    if (!code) {
        return <Navigate to="/404" replace />;
    }

    // List of internal app routes to prevent redirect loops
    const internalRoutes = ['stats', 'healthz', '404'];
    if (internalRoutes.includes(code)) {
        // This prevents interpreting an app route like '/stats' as a short code.
        // The actual component for '/stats/:code' is handled by its own Route.
        // This is a catch-all, so we need to be careful.
        return <Navigate to="/" replace />;
    }

    return <RedirectPage code={code} />;
};


export default App;
