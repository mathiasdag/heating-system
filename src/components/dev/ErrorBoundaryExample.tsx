'use client';
import React, { useState } from 'react';
import {
  ErrorBoundary,
  ErrorFallback,
  withErrorBoundary,
} from '@/components/error-handling';
import { DevIndicator } from './DevIndicator';

// Example component that can throw errors
const BuggyComponent: React.FC<{ shouldThrow?: boolean }> = ({
  shouldThrow = false,
}) => {
  if (shouldThrow) {
    throw new Error('This is a test error for demonstration!');
  }

  return (
    <div className="p-4 bg-green-100 rounded-lg">
      <DevIndicator componentName="BuggyComponent" />
      <p>This component is working fine!</p>
    </div>
  );
};

// Wrapped component using HOC
const SafeBuggyComponent = withErrorBoundary(BuggyComponent, {
  showDevIndicator: true,
});

// Example of a component that might fail
const DataComponent: React.FC<{ data?: any }> = ({ data }) => {
  if (!data) {
    throw new Error('Data is required but not provided');
  }

  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <DevIndicator componentName="DataComponent" />
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
};

export const ErrorBoundaryExample: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [hasData, setHasData] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <DevIndicator componentName="ErrorBoundaryExample" />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Error Boundary Examples</h2>

        {/* Example 1: Basic Error Boundary */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">1. Basic Error Boundary</h3>
          <button
            onClick={() => setShouldThrow(!shouldThrow)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {shouldThrow ? 'Fix Component' : 'Break Component'}
          </button>

          <ErrorBoundary
            componentName="BuggyComponent"
            showDevIndicator={true}
            fallback={
              <ErrorFallback
                error={new Error('Component failed')}
                resetError={() => setShouldThrow(false)}
                componentName="BuggyComponent"
              />
            }
          >
            <BuggyComponent shouldThrow={shouldThrow} />
          </ErrorBoundary>
        </div>

        {/* Example 2: HOC Wrapped Component */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">2. HOC Wrapped Component</h3>
          <SafeBuggyComponent shouldThrow={shouldThrow} />
        </div>

        {/* Example 3: Data-dependent Component */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">3. Data-dependent Component</h3>
          <button
            onClick={() => setHasData(!hasData)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {hasData ? 'Remove Data' : 'Add Data'}
          </button>

          <ErrorBoundary
            componentName="DataComponent"
            showDevIndicator={true}
            onError={(error, errorInfo, errorId) => {
              console.log('Custom error handler:', {
                error,
                errorInfo,
                errorId,
              });
            }}
          >
            <DataComponent
              data={hasData ? { message: 'Hello World' } : undefined}
            />
          </ErrorBoundary>
        </div>

        {/* Example 4: Multiple Error Boundaries */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">
            4. Multiple Error Boundaries
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ErrorBoundary componentName="LeftPanel" showDevIndicator={true}>
              <div className="p-4 bg-yellow-100 rounded-lg">
                <DevIndicator componentName="LeftPanel" />
                <p>Left panel content</p>
                {shouldThrow && <BuggyComponent shouldThrow={true} />}
              </div>
            </ErrorBoundary>

            <ErrorBoundary componentName="RightPanel" showDevIndicator={true}>
              <div className="p-4 bg-purple-100 rounded-lg">
                <DevIndicator componentName="RightPanel" />
                <p>Right panel content</p>
                <p>This panel won't break even if the left one does!</p>
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};
