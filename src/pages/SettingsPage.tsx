import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Check } from 'lucide-react';
import {getUser} from "../utils/auth.tsx";

const SettingsPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }, 2000);
    }
  };

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
      className="flex flex-col w-full h-full overflow-y-auto bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Link to={`/${userId}/more`}>
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-medium">Ustawienia</h1>
        </div>
      </header>
      
      <div className="px-4 py-4">
        <div className="p-4 mb-4 bg-white rounded-xl shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-gray-800">Zmień hasło</h2>
          
          {isSuccess && (
            <motion.div 
              className="p-3 mb-4 text-sm bg-green-100 text-green-800 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Hasło zostało zmienione pomyślnie</span>
              </div>
            </motion.div>
          )}
          
          <form onSubmit={handleChangePassword}>
            <div className="mb-3">
              <label htmlFor="currentPassword" className="block mb-1 text-sm font-medium text-gray-700">
                Obecne hasło
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Wprowadź obecne hasło"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="newPassword" className="block mb-1 text-sm font-medium text-gray-700">
                Nowe hasło
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Wprowadź nowe hasło"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-700">
                Potwierdź nowe hasło
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Potwierdź nowe hasło"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <motion.button
              type="submit"
              className="w-full py-2 text-white bg-blue-600 rounded-md"
              whileTap={{ scale: 0.95 }}
            >
              Zmień hasło
            </motion.button>
          </form>
        </div>
        
        <div className="p-4 bg-white rounded-xl shadow-sm">
          <h2 className="mb-3 text-lg font-bold text-gray-800">Logowanie biometryczne</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700">Włącz logowanie odciskiem palca lub Face ID</p>
              <p className="text-xs text-gray-500">Szybsze i bezpieczniejsze logowanie</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                value="" 
                className="sr-only peer"
                checked={isBiometricEnabled}
                onChange={() => setIsBiometricEnabled(!isBiometricEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;