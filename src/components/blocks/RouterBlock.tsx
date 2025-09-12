'use client';
import React from 'react';
import { AppLink } from '../AppLink';
import { DevIndicator } from '../DevIndicator';
import { BlockHeader } from './BlockHeader';
import { routeLink, type LinkGroup } from '../../utils/linkRouter';

interface NavigationLink {
  link: LinkGroup;
}

interface RouterBlockProps {
  headline?: string;
  description?: any;
  links: NavigationLink[];
}

const RouterBlock: React.FC<RouterBlockProps> = ({
  headline,
  description,
  links,
}) => {
  return (
    <section className="py-24 grid relative">
      <DevIndicator componentName="RouterBlock" />
      <BlockHeader headline={headline} description={description} />
      <hr className="mx-4 my-2" />

      <div className="relative flex justify-center items-center py-24">
        {/* Central vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-text transform -translate-x-1/2"></div>

        {/* Links stacked vertically */}
        <div className="relative z-10 flex flex-col items-center space-y-24">
          {links.map((link, idx) => {
            // Use the link router to resolve the link
            const linkResult = routeLink(link.link);
            const href = linkResult.href;

            return (
              <div key={idx} className="text-center">
                {href && (
                  <AppLink
                    link={link.link}
                    className="text-4xl sm:text-6xl md:text-7xl font-ballPill uppercase bg-bg pt-2"
                    variant="minimal"
                  >
                    {link.link.text}
                  </AppLink>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <hr className="mx-4 my-2" />
    </section>
  );
};

export default RouterBlock;
