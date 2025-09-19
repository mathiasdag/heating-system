'use client';

import React from 'react';
import Image from 'next/image';
import { DevIndicator } from '../DevIndicator';
import { useUserData } from '@/hooks/useUserData';

interface UserCardBlockProps {
  variant: 'textOnly' | 'compactCard' | 'mediumCard' | 'largeCard';
  user: Record<string, unknown> | string;
}

export default function UserCardBlock({ variant, user }: UserCardBlockProps) {
  // Handle case where user is just an ID string (unpopulated relationship)
  if (typeof user === 'string') {
    return <UserCardBlockWithFetch variant={variant} userId={user} />;
  }

  const firstName = user.firstName as string | undefined;
  const lastName = user.lastName as string | undefined;
  const email = user.email as string;
  const bylineDescription = user.bylineDescription as string | undefined;
  const profilePicture = user.profilePicture as
    | {
        url?: string;
        alt?: string;
        width?: number;
        height?: number;
      }
    | undefined;
  const references = user.references as
    | Array<{
        id: string;
        name: string;
      }>
    | undefined;

  const fullName = [firstName, lastName].filter(Boolean).join(' ') || email;

  console.log(user);

  const renderTextOnly = () => (
    <div className="bg-surface w-36 aspect-square text-center">
      <h3 className="text-lg font-bold text-gray-900 mb-3">{fullName}</h3>
      {references && references.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {references.map(tag => (
            <span
              key={tag.id}
              className="inline-block px-3 py-1 text-sm border border-gray-800 text-gray-800 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const renderCompactCard = () => (
    <div className="flex items-center space-x-4 p-4">
      {profilePicture?.url && (
        <div className="flex-shrink-0">
          <Image
            src={profilePicture.url}
            alt={profilePicture.alt || fullName}
            width={60}
            height={60}
            className="w-15 h-15 object-cover"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{fullName}</h3>
        {references && references.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {references.map(tag => (
              <span
                key={tag.id}
                className="inline-block px-3 py-1 text-sm border border-gray-800 text-gray-800 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderMediumCard = () => (
    <div className="text-center">
      {profilePicture?.url && (
        <div className="mb-4">
          <Image
            src={profilePicture.url}
            alt={profilePicture.alt || fullName}
            width={120}
            height={120}
            className="w-30 h-30 object-cover mx-auto"
          />
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
        {fullName}
      </h3>
      {references && references.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {references.map(tag => (
            <span
              key={tag.id}
              className="inline-block px-3 py-1 text-sm border border-gray-800 text-gray-800 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  const renderLargeCard = () => (
    <div className="text-center">
      {profilePicture?.url && (
        <div className="mb-4">
          <Image
            src={profilePicture.url}
            alt={profilePicture.alt || fullName}
            width={150}
            height={150}
            className="w-36 h-36 object-cover mx-auto"
          />
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase tracking-wide">
        {fullName}
      </h3>
      {references && references.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {references.map(tag => (
            <span
              key={tag.id}
              className="inline-block px-3 py-1 text-sm border border-gray-800 text-gray-800 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
      {bylineDescription && (
        <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
          {bylineDescription}
        </p>
      )}
    </div>
  );

  const renderVariant = () => {
    switch (variant) {
      case 'textOnly':
        return renderTextOnly();
      case 'compactCard':
        return renderCompactCard();
      case 'mediumCard':
        return renderMediumCard();
      case 'largeCard':
        return renderLargeCard();
      default:
        return renderTextOnly();
    }
  };

  return (
    <div className="relative">
      <DevIndicator componentName="UserCardBlock" />
      {renderVariant()}
    </div>
  );
}

/**
 * Client-side component that fetches user data
 */
function UserCardBlockWithFetch({
  variant,
  userId,
}: {
  variant: 'textOnly' | 'compactCard' | 'mediumCard' | 'largeCard';
  userId: string;
}) {
  const { user, loading, error } = useUserData(userId);

  if (loading) {
    return (
      <div className="bg-surface w-36 aspect-square text-center flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading user...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-surface w-36 aspect-square text-center flex items-center justify-center">
        <p className="text-sm text-red-500">Error loading user</p>
      </div>
    );
  }

  // Render with the fetched user data
  return <UserCardBlock variant={variant} user={user} />;
}
