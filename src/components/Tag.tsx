import React from 'react';

interface TagProps {
  name: string;
}

const Tag: React.FC<TagProps> = ({ name }) => (
  <span className="border border-black rounded-full px-2 pt-1 pb-[.15em] leading-4">{name}</span>
);

export default Tag; 