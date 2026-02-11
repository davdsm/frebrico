import React from 'react';
import { useLocation, useOutlet } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/organisms/Header';
import { NewFooter } from './components/organisms/NewFooter';
import { PageTemplate } from './components/templates/PageTemplate';

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <PageTemplate>
      <div className="py-8 px-4">
        <Header />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {outlet}
        </motion.main>
      </AnimatePresence>
      <NewFooter />
    </PageTemplate>
  );
}
