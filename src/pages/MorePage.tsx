import React, { useState, useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import MoreItem from '../components/MoreItem';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {getUser} from "../utils/auth.tsx";

const MorePage: React.FC = () => {
  const [showNav] = useState(true);
  const [showSmallTitle, setShowSmallTitle] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const morePage = [
    {
      title: 'Zmien hasło',
      icon: <img src="https://imgur.com/NwOXJ5t.png" alt="Zmien haslo" className="w-6 h-6" />,
      path: `/${userId}/more/1`,
    },
    {
      title: 'Logowanie biometryczne',
      icon: <img src="https://imgur.com/R1NvHQt.png" alt="Logowanie biometryczne" className="w-6 h-6" />,
      path: `/${userId}/more/2`,
    },
    {
      title: 'Powiadomienia',
      icon: <img src="https://imgur.com/tU6tfpJ.png" alt="Powiadomienia" className="w-6 h-6" />,
      path: `/${userId}/more/3`,
    },
    {
      title: 'Język aplikacji',
      icon: <img src="https://imgur.com/m83qNMe.png" alt="Język aplikacji" className="w-6 h-6" />,
      path: null,
    },
    {
      title: 'Wydane certyfikaty',
      icon: <img src="https://imgur.com/SpMJgiD.png" alt="Wydane certyfikaty" className="w-6 h-6" />,
      path: `/${userId}/more/5`,
    },
  ];

  const otherPage = [
    {
      title: 'Historia aktywności',
      icon: <img src="https://imgur.com/tlrGyLi.png" alt="Historia aktywności" className="w-6 h-6" />,
      path: '/more/7',
    },
    {
      title: 'O aplikacji',
      icon: <img src="https://imgur.com/wADfApD.png" alt="O aplikacji" className="w-6 h-6" />,
      path: '/more/8',
    },
    {
      title: 'Pomoc techniczna',
      icon: <img src="https://imgur.com/4miwbFp.png" alt="Pomoc techniczna" className="w-6 h-6" />,
      path: '/more/9',
    },
    {
      title: 'Oceń aplikację',
      icon: <img src="https://imgur.com/24LhoQa.png" alt="Oceń aplikację" className="w-6 h-6" />,
      path: '/more/10',
    },
    {
      title: 'Zagłosuj na pomysł',
      icon: <img src="https://imgur.com/PY1KhBK.png" alt="Zagłosuj na pomysł" className="w-6 h-6" />,
      path: '/more/11',
    },
    {
      title: 'Dezaktywuj aplikację',
      icon: <img src="https://imgur.com/0z4a7vP.png" alt="Dezaktywuj aplikację" className="w-6 h-6" />,
      path: '/more/12',
    },
  ];

  const handleItemClick = (title: string, path: string | null) => {
    if (title === 'Język aplikacji') {
      setShowLanguageModal(true);
    } else if (path) {
      navigate(path);
    }
  };

  return (
      <div className="relative h-screen overflow-hidden">
        <div ref={scrollRef} className="h-[calc(100vh-20px)] overflow-y-auto bg-[#f3f4fb]">
          <header className="sticky top-0 z-10 flex flex-col gap-1 px-2 py-1 bg-[#f3f4fb]">
            <div className="flex items-center justify-between h-[50px] relative">
              <motion.h1
                  className="text-gray-900 font-extrabold absolute left-[145px] shadow-sm -translate-x-1/2 text-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: showSmallTitle ? 1 : 0, scale: showSmallTitle ? 1 : 0.8 }}
                  transition={{ duration: 0.3 }}
              >
                Więcej
              </motion.h1>
              <div className="flex gap-4 text-[#03418a] font-medium text-[17px] ml-auto">
                <button>Wyloguj</button>
              </div>
            </div>
          </header>

          <div className="px-4 pt-4" style={{ marginTop: '-20px', zIndex: 20, position: 'relative' }}>
            <motion.h1
                className="text-[35px] font-black text-gray-900"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: showSmallTitle ? 0 : 1, scale: showSmallTitle ? 0.9 : 1 }}
                transition={{ duration: 0.3 }}
            >
              Więcej
            </motion.h1>
          </div>
          <div className="px-4 pt-3 mt-2 mb-3 text-gray-900 font-semibold text-[16px]">Ustawienia</div>
          <div className="px-4 mt-2">
            <div className="rounded-[13px] bg-white overflow-hidden">
              {morePage.map((service, index) => (
                  <div
                      key={service.title}
                      onClick={() => handleItemClick(service.title, service.path)}
                      className={`flex items-center justify-between px-4 py-4 border-b last:border-none active:bg-gray-100 cursor-pointer`}
                  >
                    <div className="flex items-center gap-3">
                      {service.icon}
                      <span className="text-[15px] font-medium text-gray-900">{service.title}</span>
                    </div>
                  </div>
              ))}
            </div>
          </div>
          <div className="px-4 pt-3 mt-2 mb-3 text-gray-900 font-semibold text-[16px]">Pozostałe</div>
          <div className="px-4 mt-2 mb-24">
            <div className="rounded-[13px] bg-white overflow-hidden">
              {otherPage.map((service, index) => (
                  <MoreItem
                      key={service.title}
                      title={service.title}
                      icon={service.icon}
                      path={service.path}
                      isLast={index === otherPage.length - 1}
                  />
              ))}
            </div>
          </div>
        </div>

        {showLanguageModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
              <div className="w-[80%] max-w-[80%] bg-white rounded-[15px] shadow-xl text-center overflow-hidden">
                <div className="px-4 pt-5 pb-3">
                  <p className="text-[17px] font-semibold text-gray-900 mb-1">
                    Chcesz zmienić <br/>język aplikacji?
                  </p>
                  <p className="text-[13px] text-gray-800">
                    Zrobisz to w ustawieniach urządzenia.
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <button
                      className="w-full py-3 text-[13px] text-[#007aff] font-semibold border-b border-gray-200 active:bg-gray-100"
                      onClick={() => {
                        setShowLanguageModal(false);
                      }}
                  >
                    Przejdź do ustawień
                  </button>
                  <button
                      className="w-full py-3 text-[13px] text-[#007aff] font-semibold active:bg-gray-100"
                      onClick={() => setShowLanguageModal(false)}
                  >
                    Anuluj
                  </button>
                </div>
              </div>
            </div>
        )}
        {showNav && (
            <div className="fixed bottom-0 left-0 right-0 bg-[#f3f4fb] border-t border-gray-200">
              <Navigation />
            </div>
        )}
      </div>
  );
};

export default MorePage;