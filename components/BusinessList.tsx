
import React from 'react';
import { Business } from '../types';
import BusinessCard from './BusinessCard';

interface BusinessListProps {
  businesses: Business[];
}

const BusinessList: React.FC<BusinessListProps> = ({ businesses }) => {
  if (businesses.length === 0) {
    return (
      <div className="text-center py-10">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-slate-900">No Businesses Found</h3>
        <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
};

export default BusinessList;
