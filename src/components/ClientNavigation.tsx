'use client';
import React from 'react';
import Navigation, { NavigationData } from './Navigation';

interface ClientNavigationProps {
  navigation: NavigationData | null;
}

/**
 * Client-only navigation component that safely handles theme context
 */
const ClientNavigation: React.FC<ClientNavigationProps> = ({ navigation }) => {
  if (!navigation) {
    return null;
  }

  return <Navigation navigation={navigation} />;
};

export default ClientNavigation;
