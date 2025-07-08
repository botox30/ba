import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import {getUser} from "../utils/auth.tsx";

const notifications = [
  {
    id: 1,
    title: 'Aktualizacja aplikacji mObywatel',
    message: '',
    date: '2025-05-18T16:55:00',
    read: true
  },
  {
    id: 2,
    title: 'Aktualizacja aplikacji mObywatel',
    message: '',
    date: '2025-05-17T15:34:00',
    read: true
  }
];

const NotificationsPage: React.FC = () => {
  const [notificationList, setNotificationList] = React.useState(notifications);

  const deleteNotification = (id: number) => {
    setNotificationList(prev => prev.filter(notification => notification.id !== id));
  };

  const refreshNotifications = () => {
    setNotificationList([]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return 'Dzisiaj';
    } else if (days === 1) {
      return 'Wczoraj';
    } else {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}.${month}.${date.getFullYear()}`;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const groupNotificationsByDate = () => {
    const grouped: Record<string, typeof notificationList> = {};

    notificationList.forEach(notification => {
      const dateKey = formatDate(notification.date);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(notification);
    });

    return grouped;
  };

  const groupedNotifications = groupNotificationsByDate();

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
        <header className="sticky top-0 z-10 flex items-center justify-center px-4 py-4 bg-[#f3f4fb] shadow-sm relative">
          <Link
              to={`/${userId}/home`}
              className="flex items-center gap-1 text-[#03418a] font-medium cursor-pointer select-none absolute left-4 top-1/2 transform -translate-y-1/2"
          >
            <img
                src="https://fobywatel.net/assets/app/images/back_blue.png"
                alt="Wróć"
                className="w-5 h-5 -ml-3"
            />
            <span className="text-base md:text-lg">Wróć</span>
          </Link>

          <h1 className="text-base md:text-lg font-medium text-gray-900">
            Powiadomienia
          </h1>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-4 flex flex-col h-full">
            {notificationList.length === 0 ? (
                <motion.div
                    key="empty-state"
                    className="flex flex-col items-center justify-center h-full"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className="p-4">
                    <img
                        src="https://imgur.com/fL2OLge.png"
                        alt="Brak powiadomień"
                        className="w-50 h-50"
                    />
                  </div>
                  <p className="mt-4 text-[17px] font-bold md:text-base text-black-500">
                    Tutaj zobaczysz swoje powiadomienia
                  </p>
                </motion.div>
            ) : (
                <div className="space-y-4 md:space-y-6">
                  {Object.entries(groupedNotifications).map(([date, notifications]) => (
                      <div key={date} className="space-y-2 md:space-y-3">
                        <h2 className="text-[15px] md:text-sm font-medium text-black-500">{date}</h2>
                        {notifications.map(notification => (
                            <motion.div
                                key={notification.id}
                                className="p-3 md:p-4 bg-white rounded-xl shadow-sm relative min-h-[80px]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                layout
                            >
                              <div className="absolute top-3 md:top-4 left-3 md:left-4">
                                <span className="text-xs text-gray-500">{formatTime(notification.date)}</span>
                              </div>
                              <div className="absolute top-1/2 right-3 md:right-4 transform -translate-y-1/2">
                                <Link to="https://imgur.com/ZG6Fmrm.png" target="_blank" rel="noopener noreferrer">
                                  <img
                                      src="https://imgur.com/ZG6Fmrm.png"
                                      alt="Delete icon"
                                      className="w-4 h-4 hover:opacity-80"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        deleteNotification(notification.id);
                                      }}
                                  />
                                </Link>
                              </div>
                              <h3 className="text-base md:text-lg font-medium text-gray-900 pt-5 md:pt-6 pr-8">
                                {notification.title}
                              </h3>
                            </motion.div>
                        ))}
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 px-4 pb-4 bg-[#f3f4fb]">
          <motion.button
              onClick={refreshNotifications}
              className="w-full py-3 text-white bg-[#03418a] hover:bg-[#0250a3] rounded-[30px] font-medium text-base shadow-md transition-colors duration-300"
              whileTap={{ scale: 0.98 }}
          >
            Odśwież
          </motion.button>
        </div>
        <Navigation />
      </motion.div>
  );
};

export default NotificationsPage;