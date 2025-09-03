'use client';
import React from 'react';
import Navigation from './Navigation';
import { useNavigation } from '@/hooks/useNavigation';

const NavigationWrapper: React.FC = () => {
  const { navigation, loading, error } = useNavigation();

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold">Värmeverket</div>
            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </nav>
    );
  }

  if (error) {
    console.error('Navigation error:', error);
    // Fallback navigation
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold">Värmeverket</div>
          </div>
        </div>
      </nav>
    );
  }

  return <Navigation navigation={navigation} />;
};

export default NavigationWrapper;
