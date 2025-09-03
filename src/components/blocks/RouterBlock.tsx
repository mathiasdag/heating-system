'use client';
import React from 'react';
import { AppLink } from '../AppLink';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { DevIndicator } from '../DevIndicator';

interface NavigationLink {
  link: {
    type: 'internal' | 'external';
    reference?: { slug: string };
    url?: string;
    text: string;
  };
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
      {headline && <h2 className="text-center mb-4">{headline}</h2>}
      {description && (
        <div className="font-mono text-center px-8 max-w-6xl mx-auto mb-4">
          <RichText data={description} />
        </div>
      )}
      <hr className="mx-4 my-2" />

      <div className="relative flex justify-center items-center py-24">
        {/* Central vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black transform -translate-x-1/2"></div>

        {/* Links stacked vertically */}
        <div className="relative z-10 flex flex-col items-center space-y-24">
          {links.map((link, idx) => {
            // Determine the href for the link
            let href: string | undefined = undefined;
            if (link.link.type === 'internal' && link.link.reference) {
              href = `/${link.link.reference.slug}`;
            } else if (link.link.type === 'external') {
              href = link.link.url;
            }

            return (
              <div key={idx} className="text-center">
                {href && (
                  <AppLink
                    href={href}
                    className="text-4xl sm:text-6xl md:text-7xl font-ballPill uppercase bg-clay pt-2"
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
