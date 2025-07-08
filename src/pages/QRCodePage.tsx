import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import { motion } from 'framer-motion';
import QRCodeActions from "../components/QRCodeActions.tsx";

const QRCodePage: React.FC = () => {
  const [showNav] = useState(true);
  const [showSmallTitle, setShowSmallTitle] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const scrollTop = scrollRef.current?.scrollTop ?? 0;
    setShowSmallTitle(scrollTop > 60);
  };

  useEffect(() => {
    const current = scrollRef.current;
    current?.addEventListener('scroll', handleScroll);
    return () => current?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <div className="relative h-screen overflow-hidden">
        <div
            ref={scrollRef}
            className="h-[calc(100vh-20px)] overflow-y-auto bg-[#f3f4fb]"
        >
          <div className="px-4 pt-4" style={{ marginTop: '50px', zIndex: 20, position: 'relative' }}>
            <motion.h1
                className="text-[35px] font-black text-gray-900"
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: showSmallTitle ? 0 : 1,
                  scale: showSmallTitle ? 0.9 : 1
                }}
                transition={{ duration: 0.3 }}
            >
              Kod QR
            </motion.h1>
          </div>

          <p className="text-[13px] text-black-900 font-medium ml-4 mb-6 leading-relaxed">
            Wybierz, co chcesz zrobić
          </p>
          <QRCodeActions />
        {showNav && (
            <div className="fixed bottom-0 left-0 right-0 bg-[#f3f4fb] border-t border-gray-200">
              <Navigation />
            </div>
        )}
      </div>
      </div>
  );
};

export default QRCodePage;
