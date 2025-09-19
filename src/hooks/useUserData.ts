import { useState, useEffect } from 'react';

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  bylineDescription?: string;
  profilePicture?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  references?: Array<{
    id: string;
    name: string;
  }>;
}

interface UseUserDataResult {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch user data by ID
 */
export function useUserData(userId: string): UseUserDataResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${userId}?depth=3`);

        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.statusText}`);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
}

/**
 * Hook to fetch multiple users by IDs
 */
export function useUsersData(userIds: string[]): {
  users: Record<string, User>;
  loading: boolean;
  error: string | null;
} {
  const [users, setUsers] = useState<Record<string, User>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userIds.length) {
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all users in parallel
        const promises = userIds.map(async userId => {
          const response = await fetch(`/api/users/${userId}?depth=3`);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch user ${userId}: ${response.statusText}`
            );
          }
          return { id: userId, data: await response.json() };
        });

        const results = await Promise.all(promises);
        const usersMap: Record<string, User> = {};

        results.forEach(({ id, data }) => {
          usersMap[id] = data;
        });

        setUsers(usersMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userIds.join(',')]); // Re-run when userIds change

  return { users, loading, error };
}
