import React from 'react';

interface TagProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-xs px-1.5 pt-[.15em] pb-[.05em]',
  md: 'text-sm px-2 pt-0.75 pb-[.15em]',
  lg: 'text-base px-2 pt-1 pb-[.15em]',
};

const Tag: React.FC<TagProps> = ({ name, size = 'md' }) => (
  <span className={`border border-black rounded-full leading-4 ${sizeClasses[size]}`}>{name}</span>
);

export default Tag; 