import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceGrid from '../components/ServiceGrid';
import Navigation from '../components/Navigation';
import { getUser } from '../utils/auth';

const HomePage: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

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
  
  return (
    <motion.div 
      className="flex flex-col w-full h-full pb-16 overflow-y-auto bg-[#f5f6fb]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 ">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 ">
            <img src="https://fobywatel.net/assets/app/images/logo_large.png" alt="logo" className="w-full h-full object-cover" />
          </div>
        </div>
        <Link to={`/${userId}/notifications`}>
          <motion.div 
            className="relative"
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </motion.div>
        </Link>
      </header>
      
      <div className="flex flex-col px-4 py-1">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-gray-800">Dokumenty</h2>
          <div className="flex gap-2">
            <Link to={`/${userId}/documents`}>
              <button className="px-4 py-1 text-sm text-[#03418a] bg-[#dce9fc] rounded-full font-bold">
                Dodaj
              </button>
            </Link>
            <Link to={`/${userId}/documents`}>
              <button className="px-4 py-1 text-sm text-[#03418a] bg-[#dce9fc] rounded-full font-bold">
                Wszystkie
              </button>
            </Link>
          </div>
        </div>

        <div
            className="mt-6 rounded-[12px] overflow-hidden shadow-md relative"
            style={{ width: '300px' }}
        >
          <a
              className="absolute top-4 left-5 z-10"
          >
            <img
                src="https://imgur.com/105Mhd4.png"
                alt="Ikona"
                className="w-8 h-8"
            />
          </a>

          <div
              className="h-48 bg-cover bg-center flex flex-col justify-end"
              style={{
                backgroundImage: `url('https://imgur.com/E608bE3.png')`,
              }}
          >
            <Link
                to={`/${userId}/card`}
                className="bg-white flex items-center justify-between py-4 px-5"
            >
              <p className="text-gray-800 font-semibold text-[17px]">mDowód</p>
              <img
                  src="https://imgur.com/XwCobSm.png"
                  alt="Strzałka"
                  className="w-4 h-4"
              />
            </Link>
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-between">
            <h2 className="text-[19px] font-semibold text-gray-800">Usługi</h2>
            <Link to={`/${userId}/services`}>
              <button className="px-4 py-1 text-sm text-[#03418a] bg-[#dce9fc] rounded-full font-bold">
                Wszystkie
              </button>
            </Link>
          </div>
          
          <div className="mt-4">
            <ServiceGrid />
          </div>
        </div>
      </div>
      <Navigation />
    </motion.div>
  );
};

export default HomePage;
