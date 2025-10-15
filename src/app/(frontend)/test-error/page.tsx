'use client';

import React from 'react';

export default function TestErrorPage() {
  const triggerError = () => {
    throw new Error('This is a test error to demonstrate the error page');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto font-mono grid gap-4">
        <h1 className="text-lg font-sans">Test Error Page</h1>
        <p>
          Click the button below to trigger an error and see the error page:
        </p>
        <button
          onClick={triggerError}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Trigger Error
        </button>
      </div>
    </div>
  );
}
