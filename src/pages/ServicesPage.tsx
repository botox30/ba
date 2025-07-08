import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import ServiceItem from '../components/ServiceItem';
import { motion } from 'framer-motion';
import {getUser} from "../utils/auth.tsx";

const ServicesPage: React.FC = () => {
  const [showNav] = useState(true);
  const [showSmallTitle, setShowSmallTitle] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const handleScroll = () => {
    const scrollTop = scrollRef.current?.scrollTop ?? 0;
    setShowSmallTitle(scrollTop > 60);
  };

  useEffect(() => {
    const current = scrollRef.current;
    current?.addEventListener('scroll', handleScroll);
    return () => current?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user?.id) {
        setUserId(user.id);
      }
    };
    fetchUser();
  }, []);

  if (!userId) return null;

  const services = [
    {
      title: 'Bezpiecznie w sieci',
      icon: <img src="https://imgur.com/nB6cAVI.png" alt="Bezpiecznie w sieci" className="w-6 h-6" />,
      path: `/${userId}/service/1`,
    },
    {
      title: 'Alert powodziowy',
      icon: <img src="https://imgur.com/Yie2R99.png" alt="Alert powodziowy" className="w-6 h-6" />,
      path: `/${userId}/service/2`,
    },
    {
      title: 'Jakość powietrza',
      icon: <img src="https://imgur.com/w3geHul.png" alt="Jakość powietrza" className="w-6 h-6" />,
      path: `/${userId}/service/3`,
    },
    {
      title: 'Historia pojazdu',
      icon: <img src="https://imgur.com/2Ni6s37.png" alt="Historia pojazdu" className="w-6 h-6" />,
      path: `/${userId}/service/4`,
    },
    {
      title: 'E-wizyta w ZUS',
      icon: <img src="https://imgur.com/Wg6LGb1.png" alt="E-wizyta w ZUS" className="w-6 h-6" />,
      path: `/${userId}/service/5`,
    },
    {
      title: 'Bezpieczny autobus',
      icon: <img src="https://imgur.com/V9rDJfO.png" alt="Bezpieczny autobus" className="w-6 h-6" />,
      path: `/${userId}/service/6`,
    },
  ];

  const otherServices = [
    {
      title: 'Polak za granica',
      icon: <img src="https://imgur.com/0eb4hos.png" alt="Polak za granica" className="w-6 h-6" />,
      path: `/${userId}/service/7`,
    },
    {
      title: 'Uprawnienia kierowcy',
      icon: <img src="https://imgur.com/fAVzHF8.png" alt="Uprawnienia kierowcy" className="w-6 h-6" />,
      path: `/${userId}/service/8`,
    },
  ];

  return (
      <div className="relative h-screen overflow-hidden">
        <div
            ref={scrollRef}
            className="h-[calc(100vh-20px)] overflow-y-auto bg-[#f3f4fb]"
        >
          <header className="sticky top-0 z-10 flex flex-col gap-1 px-2 py-1 bg-[#f3f4fb] backdrop-blur-sm">
            <div className="flex items-center justify-between h-[90px] relative">
              <motion.h1
                  className="text-gray-900 font-extrabold absolute left-[145px] -translate-x-1/2 text-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: showSmallTitle ? 1 : 0,
                    scale: showSmallTitle ? 1 : 0.8
                  }}
                  transition={{ duration: 0.3 }}
              >
                Usługi
              </motion.h1>

              <div className="flex gap-4 text-[#03418a] font-medium text-[17px] ml-auto">
                <button>Edytuj</button>
              </div>
            </div>
          </header>
          <div className="px-4 pt-4" style={{ marginTop: '-50px', zIndex: 20, position: 'relative' }}>
            <motion.h1
                className="text-[35px] font-black text-gray-900"
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: showSmallTitle ? 0 : 1,
                  scale: showSmallTitle ? 0.9 : 1
                }}
                transition={{ duration: 0.3 }}
            >
              Usługi
            </motion.h1>
          </div>

          <div className="px-4 pt-2">
            <div className="relative">
              <input
                  type="text"
                  placeholder="Szukaj"
                  className="w-full pl-10 pr-2 py-2 rounded-[10px] bg-[#e5e6eb] font-bold placeholder-[#808286] text-gray-800 focus:outline-none"
                  style={{ height: '40px' }}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img src="https://i.imgur.com/ZUBPCT6.png" alt="szukaj" className="w-6 h-6" />
            </span>
            </div>
          </div>

          <div className="px-4 pt-3 mt-2 mb-3 text-gray-900 font-semibold text-[16px]">
            Na pulpicie
          </div>

          <div className="px-4 mt-2">
            <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
              {services.map((service, index) => (
                  <ServiceItem
                      key={service.title}
                      title={service.title}
                      icon={service.icon}
                      path={service.path}
                      isLast={index === services.length - 1}
                  />
              ))}
            </div>
          </div>

          <div className="px-4 pt-3 mt-2 mb-3 text-gray-900 font-semibold text-[16px]">
            Pozostałe
          </div>

          <div className="px-4 mt-2 mb-24">
            <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
              {otherServices.map((service, index) => (
                  <ServiceItem
                      key={service.title}
                      title={service.title}
                      icon={service.icon}
                      path={service.path}
                      isLast={index === otherServices.length - 1}
                  />
              ))}
            </div>
          </div>
        </div>
        {showNav && (
            <div className="fixed bottom-0 left-0 right-0 bg-[#f3f4fb] border-t border-gray-200">
              <Navigation />
            </div>
        )}
      </div>
  );
};

export default ServicesPage;
