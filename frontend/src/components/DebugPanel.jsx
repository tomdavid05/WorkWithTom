import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { testApiConnection, testAuthEndpoint } from '../utils/apiTest';

const DebugPanel = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [testResults, setTestResults] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  const runTests = async () => {
    setIsTesting(true);
    setTestResults(null);

    const apiTest = await testApiConnection();
    const authTest = await testAuthEndpoint();

    setTestResults({
      api: apiTest,
      auth: authTest,
      timestamp: new Date().toISOString()
    });
    setIsTesting(false);
  };

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-md z-50">
      <h3 className="font-bold mb-2">Debug Panel</h3>
      
      <div className="space-y-2 text-sm">
        <div>Auth Status: {isAuthenticated ? '✅ Logged In' : '❌ Not Logged In'}</div>
        <div>Loading: {loading ? '⏳ Yes' : '✅ No'}</div>
        <div>User: {user ? user.username : 'None'}</div>
        <div>Token: {localStorage.getItem('token') ? '✅ Present' : '❌ Missing'}</div>
      </div>

      <button
        onClick={runTests}
        disabled={isTesting}
        className="mt-3 px-3 py-1 bg-blue-500 text-white rounded text-sm disabled:opacity-50"
      >
        {isTesting ? 'Testing...' : 'Test API'}
      </button>

      {testResults && (
        <div className="mt-3 text-xs">
          <div className="font-bold">Test Results:</div>
          <div>API: {testResults.api.success ? '✅' : '❌'} {testResults.api.error || 'OK'}</div>
          <div>Auth: {testResults.auth.success ? '✅' : '❌'} {testResults.auth.error || 'OK'}</div>
          <div className="text-gray-500">{testResults.timestamp}</div>
        </div>
      )}
    </div>
  );
};

export default DebugPanel; 