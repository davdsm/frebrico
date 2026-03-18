import React from 'react';
import { useLocation, useOutlet } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/organisms/Header';
import { NewFooter } from './components/organisms/NewFooter';
import { PageTemplate } from './components/templates/PageTemplate';
import { useContentState } from './content/ContentContext';
import { useAuth } from './auth/AuthContext';
import { PageLoader } from './components/atoms/PageLoader';
import {
  useScrollToTop,
  useHideHeaderOnScroll,
  useIsMobile,
  useHomePageLoader,
} from './hooks';
import { pageTransitionVariants } from './layout/pageTransitionVariants';
import { getApiBase } from './content/api';

function MaintenancePage({
  title,
  message,
  image,
}: {
  title: string;
  message: string;
  image: string;
}) {
  const imageSrc = image && !image.startsWith('http') ? getApiBase() + image : image;
  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center px-6 py-16 text-center">
      {image && (
        <img
          src={imageSrc}
          alt="Em manutenção"
          className="w-full max-w-lg max-h-[380px] object-contain rounded-2xl mb-10"
        />
      )}
      <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-6">
        <svg
          className="w-7 h-7 text-amber-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.42 15.17l-5.384 5.384a2.025 2.025 0 01-2.853-2.853l5.384-5.384m2.853 2.853l5.384-5.384a2.025 2.025 0 00-2.853-2.853l-5.384 5.384m2.853 2.853L7.78 7.78m8.485 8.485L20.25 12"
          />
        </svg>
      </div>
      <h1 className="text-3xl md:text-4xl font-semibold text-[#131313] mb-3">{title}</h1>
      <p className="text-base md:text-lg text-[#5a5a59] max-w-md leading-relaxed">{message}</p>
      <div className="mt-8 flex items-center gap-2 text-[#5a5a59]">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-sm font-medium">Voltamos em breve</span>
      </div>
    </div>
  );
}

function getMaintenanceProps(content: ReturnType<typeof useContentState>['content'], isAdmin: boolean) {
  const enabled = content['_settings']?.maintenance?.enabled === 'true';
  const image = content['_settings']?.maintenance?.image ?? '';
  const title = content['_settings']?.maintenance?.title ?? '';
  const message = content['_settings']?.maintenance?.message ?? '';
  return { showMaintenance: enabled && !isAdmin, title, message, image };
}

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();
  const { content, loading } = useContentState();
  const { user } = useAuth();
  const isHome = location.pathname === '/';

  const { showMaintenance, title: maintenanceTitle, message: maintenanceMessage, image: maintenanceImage } =
    getMaintenanceProps(content, user?.isAdmin === true);

  useScrollToTop(location.pathname);
  const { showHeader, isScrolled } = useHideHeaderOnScroll();
  const isMobile = useIsMobile();
  const { showLoader, loaderDone, onLoaderExitComplete } = useHomePageLoader(isHome, loading);

  const variants = isMobile ? pageTransitionVariants.mobile : pageTransitionVariants.desktop;

  if (showMaintenance) {
    return (
      <MaintenancePage
        title={maintenanceTitle}
        message={maintenanceMessage}
        image={maintenanceImage}
      />
    );
  }

  return (
    <>
      <AnimatePresence onExitComplete={onLoaderExitComplete}>
        {showLoader && (
          <motion.div
            key="home-loader"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200]"
          >
            <PageLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {loaderDone && (
        <PageTemplate>
          <div
            className={`fixed inset-x-0 top-0 z-50 py-3 text-black transition-all duration-300 ${
              showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            } ${
              isScrolled
                ? 'bg-white shadow-[0_8px_24px_rgba(149,157,165,0.2)]'
                : 'bg-transparent'
            }`}
          >
            <div className="px-4">
              <Header isCompact={isScrolled} />
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="pt-24"
            >
              {outlet}
              <NewFooter />
            </motion.main>
          </AnimatePresence>
        </PageTemplate>
      )}
    </>
  );
}
