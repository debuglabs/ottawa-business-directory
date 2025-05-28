
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      <p className="mt-4 text-lg text-slate-700">Loading Businesses...</p>
    </div>
  );
};

export default LoadingSpinner;
