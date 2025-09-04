'use client';
import React from 'react';
import Navigation, { NavigationData } from './Navigation';

interface NavigationWrapperProps {
  navigation: NavigationData | null;
}

const NavigationWrapper: React.FC<NavigationWrapperProps> = ({
  navigation,
}) => {
  if (!navigation) {
    return null;
  }

  return <Navigation navigation={navigation} />;
};

export default NavigationWrapper;
