'use client';

import React from 'react';
import Image from 'next/image';
import { DevIndicator } from '../DevIndicator';
import { useUserData } from '@/hooks/useUserData';
import Tag from '../Tag';

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

  const renderTextOnly = () => (
    <div className="bg-surface w-72 text-center p-4 flex flex-col justify-center gap-2 rounded-xl">
      <h3 className="text-md whitespace-nowrap truncate">{fullName}</h3>
      {references && references.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1">
          {references.map(tag => (
            <Tag key={tag.id} name={tag.name} size="sm" />
          ))}
        </div>
      )}
    </div>
  );

  const renderCompactCard = () => (
    <div className="bg-surface w-72 p-4 flex justify-center gap-4 rounded-xl">
      {profilePicture?.url && (
        <Image
          src={profilePicture.url}
          alt={profilePicture.alt || fullName}
          width={60}
          height={60}
          className="w-15 h-15 object-cover rounded-md"
        />
      )}
      <div className="flex-1 min-w-0 flex gap-1 flex-col justify-center">
        <h3 className="text-base whitespace-nowrap truncate">{fullName}</h3>
        {references && references.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {references.map(tag => (
              <Tag key={tag.id} name={tag.name} size="sm" />
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

  // If error after retries, don't render anything (remove the block)
  if (error || (!loading && !user)) {
    return null;
  }

  // Show loading state that matches the card variant
  if (loading) {
    return <UserCardBlockLoading variant={variant} />;
  }

  // Render with the fetched user data
  return <UserCardBlock variant={variant} user={user} />;
}

/**
 * Reusable skeleton components
 */
const SkeletonBox = ({ className }: { className: string }) => (
  <div className={`bg-gray-300 rounded animate-pulse ${className}`}></div>
);

const SkeletonCircle = ({ size }: { size: string }) => (
  <SkeletonBox className={`${size} rounded-full`} />
);

const SkeletonText = ({
  width,
  height = 'h-3',
}: {
  width: string;
  height?: string;
}) => <SkeletonBox className={`${height} ${width}`} />;

/**
 * Loading component that matches the card variant
 */
function UserCardBlockLoading({
  variant,
}: {
  variant: 'textOnly' | 'compactCard' | 'mediumCard' | 'largeCard';
}) {
  const variants = {
    textOnly: (
      <div className="bg-surface w-36 aspect-square text-center flex items-center justify-center">
        <div className="animate-pulse">
          <SkeletonText width="w-24" height="h-4" />
          <SkeletonText width="w-16" />
        </div>
      </div>
    ),

    compactCard: (
      <div className="flex items-center space-x-4 p-4">
        <div className="flex-shrink-0">
          <SkeletonCircle size="w-15 h-15" />
        </div>
        <div className="flex-1 min-w-0">
          <SkeletonText width="w-32" height="h-4" />
          <SkeletonText width="w-20" />
        </div>
      </div>
    ),

    mediumCard: (
      <div className="text-center">
        <div className="mb-4">
          <SkeletonCircle size="w-30 h-30 mx-auto" />
        </div>
        <SkeletonText width="w-40 mx-auto" height="h-6" />
        <SkeletonText width="w-24 mx-auto" />
      </div>
    ),

    largeCard: (
      <div className="text-center">
        <div className="mb-4">
          <SkeletonCircle size="w-36 h-36 mx-auto" />
        </div>
        <SkeletonText width="w-48 mx-auto" height="h-6" />
        <SkeletonText width="w-32 mx-auto" />
        <SkeletonText width="w-40 mx-auto" />
      </div>
    ),
  };

  return variants[variant] || variants.textOnly;
}
