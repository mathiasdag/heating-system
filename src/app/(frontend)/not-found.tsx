'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AppAction } from '@/components/AppLink';
import { DevIndicator } from '@/components/DevIndicator';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <DevIndicator componentName="NotFound" />

      <motion.div
        className="text-center max-w-2xl mx-auto font-mono grid gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div className="">
          <h1 className="text-lg font-sans">Sidan kunde inte hittas</h1>
        </motion.div>
        <p>
          Den sida du letar efter finns inte eller har flyttats. Om du tror att
          detta är ett fel, kontakta oss så hjälper vi dig.
        </p>
        <AppAction href="/" variant="minimal" className="underline uppercase">
          Tillbaka till startsidan
        </AppAction>
      </motion.div>
    </div>
  );
}
