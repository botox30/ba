import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom';
import {getUser} from "../utils/auth.tsx";

const DocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = React.useState(false);
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
          className="flex flex-col w-full h-full bg-[#f3f4fb]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
      >
        <header className="sticky top-0 z-10 flex items-center justify-end px-4 py-4 bg-[#f3f4fb]">
          <div className="flex gap-4 text-[#03418a] font-medium text-[16px]">
            {!isEditing && (
                <button onClick={() => navigate(`/${userId}/documentsAdd`)}>Dodaj</button>
            )}
            <button onClick={() => setIsEditing(prev => !prev)}>
              {isEditing ? 'Zakończ' : 'Edytuj'}
            </button>
          </div>
        </header>

        <div className="px-4 pt-4">
          <h1
              className="text-[35px] font-black text-gray-900"
              style={{ textShadow: '1px 0 black, 1.5px 0 black' }}
          >
            Dokumenty
          </h1>
          {isEditing && (
              <p className="text-[13px] text-gray-500 pt-1">
                Tutaj możesz zmieniać kolejność dokumentów.
              </p>
          )}
        </div>
        {!isEditing && (
            <div className="px-4 pt-2">
              <div className="relative">
                <input
                    type="text"
                    placeholder="Szukaj"
                    className="w-full pl-10 pr-2 py-2 rounded-[10px] bg-[#e5e6eb] font-bold placeholder-[#808286] text-gray-800 focus:outline-none"
                    style={{ lineHeight: '1.5', height: '40px' }}
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img
                  src="https://i.imgur.com/ZUBPCT6.png"
                  alt="ikona wyszukiwania"
                  className="w-6 h-6"
              />
            </span>
              </div>
            </div>
        )}
        <div className="px-4 pt-6 space-y-6">
          {isEditing ? (
              <>
                <div>
                  <h2 className="font-semibold text-[16px] text-gray-900 mb-3">Na pulpicie</h2>
                  <div className="bg-white rounded-[10px] shadow-sm p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                          src="https://imgur.com/ebTsT99.png"
                          alt="Ikona dokumentu"
                          className="w-6 h-6"
                      />
                      <span className="text-[16px] font-bold text-gray-900">mDowód</span>
                    </div>
                    <img
                        src="https://imgur.com/4UczGu0.png"
                        alt="Ikona przesuwania"
                        className="w-5 h-5 opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="font-semibold text-[16px] text-gray-900 mb-2">Pozostałe</h2>
                  <div className="bg-white rounded-[10px] shadow-sm p-5 text-center">
                    <p className="text-[15px] font-bold text-gray-900 mb-1">
                      Chcesz mieć więcej dokumentów <br />w aplikacji?
                    </p>
                    <p className="text-sm text-gray-600">
                      Użyj ikony z lewej strony nazwy dokumentu.
                    </p>
                  </div>
                </div>
              </>
          ) : (
              <>
                <div>
                  <h2 className="font-semibold text-[16px] text-gray-900 mb-2">Na pulpicie</h2>
                  <div className="bg-white rounded-[10px] shadow-sm p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                          src="https://imgur.com/UXC4mAS.png"
                          alt="Dokument"
                          className="w-8 h-8"
                      />
                      <span className="text-[18px] font-bold text-gray-900">mDowód</span>
                    </div>
                    <span className="text-gray-300 text-xl">{'>'}</span>
                  </div>
                </div>

                <div>
                  <h2 className="font-semibold text-[16px] text-gray-900 mb-2">Pozostałe</h2>
                  <div className="bg-white rounded-[10px] shadow-sm p-5 text-center">
                    <p className="text-[15px] font-bold text-gray-900 mb-1">
                      Chcesz mieć więcej dokumentów <br />w aplikacji?
                    </p>
                    <p className="text-sm text-gray-600">
                      Użyj opcji Dodaj w prawym górnym rogu.
                    </p>
                  </div>
                </div>
              </>
          )}
        </div>

        <Navigation />
      </motion.div>
  );
};

export default DocumentsPage;