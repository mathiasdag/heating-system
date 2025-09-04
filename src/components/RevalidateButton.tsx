'use client';
import React, { useState } from 'react';

const RevalidateButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRevalidate = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setMessage(
          '✅ Navigation revalidated! Refresh the page to see changes.'
        );
        // Force a page refresh to show the new data
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage('❌ Failed to revalidate navigation');
      }
    } catch (error) {
      setMessage('❌ Error revalidating navigation');
      console.error('Revalidation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleRevalidate}
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg shadow-lg transition-colors duration-200 flex items-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Revalidating...</span>
          </>
        ) : (
          <>
            <span>🔄</span>
            <span>Revalidate Navigation</span>
          </>
        )}
      </button>
      {message && (
        <div className="mt-2 p-2 bg-white rounded-lg shadow-lg text-sm">
          {message}
        </div>
      )}
    </div>
  );
};

export default RevalidateButton;
