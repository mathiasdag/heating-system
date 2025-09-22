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
    <div className="">
      <button
        onClick={handleRevalidate}
        disabled={isLoading}
        className="fixed uppercase bottom-2 pt-[.125rem] h-[40px] right-2 z-50 bg-text text-bg mix-blend-multiply px-3 rounded-sm"
      >
        {isLoading ? (
          <>
            <span>Revalidating...</span>
          </>
        ) : (
          <>
            <span>Revalidate</span>
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
