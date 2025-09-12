'use client';
import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import clsx from 'clsx';
import Marquee from 'react-fast-marquee';

export const Footer: React.FC = () => {
  return (
    <footer className="relative">
      <div className="mx-2">
        <div className="border-t border-b border-text flex justify-between py-2">
          <div className="h-36 w-px"></div>
          <div className="h-36 w-px bg-text"></div>
          <div className="h-36 w-px bg-text"></div>
          <div className="h-36 w-px bg-text"></div>
          <div className="h-36 w-px bg-text"></div>
          <div className="h-36 w-px bg-text"></div>
          <div className="h-36 w-px bg-text hidden sm:block"></div>
          <div className="h-36 w-px bg-text hidden md:block"></div>
          <div className="h-36 w-px bg-text hidden md:block"></div>
          <div className="h-36 w-px bg-text hidden md:block"></div>
          <div className="h-36 w-px bg-text hidden lg:block"></div>
          <div className="h-36 w-px bg-text hidden lg:block"></div>
          <div className="h-36 w-px bg-text hidden lg:block"></div>
          <div className="h-36 w-px bg-text hidden xl:block"></div>
          <div className="h-36 w-px bg-text hidden xl:block"></div>
          <div className="h-36 w-px bg-text hidden xl:block"></div>
          <div className="h-36 w-px bg-text hidden xl:block"></div>
          <div className="h-36 w-px"></div>
        </div>
        <div className="flex justify-between py-2">
          <div className="h-36 w-px"></div>
          <div className="h-36 w-px bg-text"></div>
          <div className="h-36 w-px"></div>
          <div className="h-36 w-px"></div>
          <div className="h-36 w-px"></div>
          <div className="h-36 w-px hidden sm:block"></div>
          <div className="h-36 w-px hidden md:block"></div>
          <div className="h-36 w-px hidden md:block"></div>
          <div className="h-36 w-px hidden md:block"></div>
          <div className="h-36 w-px hidden lg:block"></div>
          <div className="h-36 w-px hidden lg:block"></div>
          <div className="h-36 w-px hidden lg:block"></div>
          <div className="h-36 w-px hidden xl:block"></div>
          <div className="h-36 w-px hidden xl:block"></div>
          <div className="h-36 w-px hidden xl:block"></div>
          <div className="h-36 w-px hidden xl:block"></div>
          <div className="h-36 w-px bg-text"></div>
          <div className="h-36 w-px"></div>
        </div>
        <div className="border-t border-b border-text flex justify-between py-2">
          <div className="h-36 w-px"></div>
          <div className="h-36 w-px bg-text"></div>
          <div className="h-36 w-px bg-text"></div>
          <div className="h-36 w-px bg-text"></div>
          <div className="h-36 w-px bg-text"></div>
          <div className="h-36 w-px bg-text"></div>
          <div className="h-36 w-px bg-text hidden sm:block"></div>
          <div className="h-36 w-px bg-text hidden md:block"></div>
          <div className="h-36 w-px bg-text hidden md:block"></div>
          <div className="h-36 w-px bg-text hidden md:block"></div>
          <div className="h-36 w-px bg-text hidden lg:block"></div>
          <div className="h-36 w-px bg-text hidden lg:block"></div>
          <div className="h-36 w-px bg-text hidden lg:block"></div>
          <div className="h-36 w-px bg-text hidden xl:block"></div>
          <div className="h-36 w-px bg-text hidden xl:block"></div>
          <div className="h-36 w-px bg-text hidden xl:block"></div>
          <div className="h-36 w-px bg-text hidden xl:block"></div>
          <div className="h-36 w-px"></div>
        </div>
        <div className="font-ballPill uppercase">
          <Marquee speed={30}>
            <span className="mx-8">Värmeverket</span>
            <span className="mx-8">Värmeverket</span>
            <span className="mx-8">Värmeverket</span>
            <span className="mx-8">Värmeverket</span>
            <span className="mx-8">Värmeverket</span>
          </Marquee>
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
