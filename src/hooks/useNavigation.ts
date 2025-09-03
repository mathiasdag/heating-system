import { useEffect, useState } from 'react';

interface NavigationLink {
  type: 'internal' | 'external' | 'custom';
  reference?: { slug: string };
  url?: string;
  action?: string;
}

interface MenuItem {
  label: string;
  link: NavigationLink;
  isActive?: boolean;
  children?: MenuItem[];
}

interface NavigationData {
  id: string;
  name: string;
  menuItems: MenuItem[];
}

export const useNavigation = () => {
  const [navigation, setNavigation] = useState<NavigationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/navigation');

        if (!response.ok) {
          throw new Error('Failed to fetch navigation');
        }

        const data = await response.json();
        setNavigation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching navigation:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigation();
  }, []);

  return { navigation, loading, error };
};
