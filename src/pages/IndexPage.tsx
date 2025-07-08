import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { getUser } from '../utils/auth';

// Check if running as PWA
const isPWA = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true ||
           document.referrer.includes('android-app://');
};

const IndexPage: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPWAMessage, setShowPWAMessage] = useState(false);
  const navigate = useNavigate();
  const currentHour = new Date().getHours();
  const greeting = currentHour < 18 ? 'Dzień dobry!' : 'Dobry wieczór!';
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      // Check if PWA and no stored auth
      if (isPWA()) {
        const storedUser = localStorage.getItem('mobywatel_user');
        if (!storedUser) {
          setShowPWAMessage(true);
        }
      }
    }, 2500);

    return () => clearTimeout(timer);
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

  if (showSplash) {
    return (
        <div
            className="flex flex-col items-center justify-center w-full h-screen bg-white bg-center bg-cover"
            style={{ backgroundImage: "url('https://fobywatel.net/assets/app/images/login.png')" }}
        >
          <motion.div
              className="flex items-center justify-center w-20 h-20 overflow-hidden"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
          >
            <img
                src="https://fobywatel.net/assets/app/images/logo_large.png"
                alt="Logo"
                className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
    );
  }

  // Show PWA authentication message
  if (showPWAMessage) {
    return (
      <motion.div
        className="relative flex flex-col w-full h-screen bg-cover bg-center pt-12"
        style={{ backgroundImage: "url('https://fobywatel.net/assets/app/images/login.png')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center justify-center w-10 h-10">
              <img src="https://fobywatel.net/assets/app/images/logo_large.png" alt="logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-[25px] font-bold mt-1">mObywatel</h1>
          </div>

          <motion.div
            className="mt-8 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-[24px] font-extrabold text-gray-900 mb-4">Wymagane logowanie</h2>
            <p className="text-[16px] text-gray-700 mb-6">
              Aby korzystać z aplikacji, musisz się najpierw zalogować przez przeglądarkę internetową.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-[14px] text-blue-800">
                <strong>Instrukcja:</strong><br/>
                1. Otwórz przeglądarkę (Safari/Chrome)<br/>
                2. Przejdź na stronę aplikacji<br/>
                3. Zaloguj się przez Discord<br/>
                4. Wróć do tej aplikacji
              </p>
            </div>
          </motion.div>

          <div className="flex-1" />
          
          <div className="mb-8">
            <motion.button
              onClick={() => {
                // Try to open in browser
                window.open(window.location.origin, '_blank');
              }}
              className="w-full text-center py-3 text-white bg-[#03418a] hover:bg-[#03418a] rounded-[30px] font-medium text-base shadow-md transition-colors duration-300 mb-4"
              whileTap={{ scale: 0.98 }}
            >
              Otwórz w przeglądarce
            </motion.button>
            
            <motion.button
              onClick={() => setShowPWAMessage(false)}
              className="w-full text-center py-3 text-[#03418a] bg-transparent border-2 border-[#03418a] rounded-[30px] font-medium text-base transition-colors duration-300"
              whileTap={{ scale: 0.98 }}
            >
              Sprawdź ponownie
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
      <motion.div
          className="relative flex flex-col w-full h-screen bg-cover bg-center pt-12"
          style={{ backgroundImage: "url('https://fobywatel.net/assets/app/images/login.png')" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
      >
        <div className="px-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center justify-center w-10 h-10 ">
              <img src="https://fobywatel.net/assets/app/images/logo_large.png" alt="logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-[25px] font-bold mt-1 ">mObywatel</h1>
          </div>

          <motion.div
              className="mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
          >
            <h2 className="text-[30px] font-extrabold text-gray-900">{greeting}</h2>
            <p className="mt-[-4px] text-[18px] text-gray-700 font-Poppins">
              Zaloguj się do aplikacji.
            </p>
          </motion.div>

          <motion.form
              className="flex flex-col flex-grow mt-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-sm px-4 py-3 w-[100%] max-w-md mx-auto">
              <div className="relative">
                <label
                    htmlFor="password"
                    className="block mb-1 text-[14px] font-medium text-gray-500"
                >
                  Hasło
                </label>
                <div className="relative">
                  <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-[50px] px-6 pr-10 text-[15px] border border-gray-600 rounded-[5px] focus:outline-none focus:ring-1 focus:ring-[#03418a]"
                  />
                  <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="mt-2">
                <button
                    type="button"
                    className="text-[13px] font-medium text-[#03418a]"
                >
                  Nie pamiętasz hasła?
                </button>
              </div>
            </div>

            <div className="flex-1" />
  <div className="mt-4 mb-1">
    <motion.div whileTap={{ scale: 0.98 }}>
      <Link
        to={`/${userId}/home`}
        className="block w-full text-center py-3 text-white bg-[#03418a] hover:bg-[#03418a] rounded-[30px] font-medium text-base shadow-md transition-colors duration-300"
      >
        Zaloguj się
      </Link>
    </motion.div>
  </div>
          </motion.form>
        </div>

        <motion.div
            className="w-full py-4 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-6 pl-6">
            <div className="flex items-center gap-2">
              <img
                  src="https://fobywatel.net/assets/app/images/coi.png"
                  alt="COI logo"
                  className="w-16 h-16 object-contain"
              />
            </div>

            <div className="flex items-center gap-2">
              <img
                  src="https://fobywatel.net/assets/app/images/mc.png"
                  alt="Ministerstwo logo"
                  className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          <p className="text-xs text-gray-400 pr-2">wersja 4.56.0 (10)</p>
        </motion.div>
      </motion.div>
  );
};

export default IndexPage;