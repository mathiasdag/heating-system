'use client';
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import clsx from 'clsx';
import Marquee from 'react-fast-marquee';

export const Footer: React.FC = () => {
  return (
    <footer className="relative">
      <div className="mx-2">
        <div className="border-t border-b border-text flex justify-between py-1 md:py-2">
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow"></div>
        </div>
        <div className="flex justify-between py-1 md:py-2">
          <div className="aspect-[9/16] basis-[6.6666%] shrink-0 border-r border-text"></div>
          <div className="font-ballPill uppercase w-[86.5%] text-vvCustom pt-3">
            <Marquee speed={50} className="">
              <span className="mx-12">Värmeverket</span>
              <span className="mx-12">Värmeverket</span>
              <span className="mx-12">Värmeverket</span>
              <span className="mx-12">Värmeverket</span>
              <span className="mx-12">Värmeverket</span>
            </Marquee>
          </div>
          <div className="aspect-[9/16]  basis-[6.6666%] shrink-0 border-l border-text"></div>
        </div>
        <div className="border-t border-b border-text flex justify-between py-1 md:py-2">
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow border-r border-text"></div>
          <div className="aspect-[9/16] grow"></div>
        </div>
      </div>
      <div className="flex items-end justify-between gap-3 p-2 uppercase pb-12 md:pb-2">
        <div className="flex gap-x-3 flex-col xl:flex-row">
          <div className="whitespace-nowrap">
            &copy; {new Date().getFullYear()} Varmeverket
          </div>
          <div className="whitespace-nowrap">
            Bredängsvägen 203, 127 34 Skärholmen
          </div>
          <div className="whitespace-nowrap">Email</div>
          <div className="whitespace-nowrap">Instagram</div>
          <div className="whitespace-nowrap">Terms of service</div>
        </div>
        <div className="whitespace-nowrap">
          Theme: <ThemeToggle showLabel={false} />
        </div>
      </div>
    </footer>
  );
};
