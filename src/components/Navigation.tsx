import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getUser } from '../utils/auth';

const Navigation: React.FC = () => {
  const location = useLocation();
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

  const navItems = [
    {
      path: `/${userId}/home`,
      label: 'Pulpit',
      openIcon: 'https://fobywatel.net/assets/app/images/home_open.png',
      closeIcon: 'https://fobywatel.net/assets/app/images/home.png',
      activePaths: [
        `/${userId}/home`,
        `/${userId}/notifications`,
        `/${userId}/card`,
        `/${userId}/shortcuts`,
        `/${userId}/reversepesel`,
        `/${userId}/carddocument`,
      ],
    },
    {
      path: `/${userId}/documents`,
      label: 'Dokumenty',
      openIcon: 'https://fobywatel.net/assets/app/images/documents_open.png',
      closeIcon: 'https://fobywatel.net/assets/app/images/documents.png',
      activePaths: [
        `/${userId}/documents`,
        `/${userId}/documentsAdd`,
      ],
    },
    {
      path: `/${userId}/services`,
      label: 'Usługi',
      openIcon: 'https://fobywatel.net/assets/app/images/services_open.png',
      closeIcon: 'https://fobywatel.net/assets/app/images/services.png',
      activePaths: [
        `/${userId}/services`,
        ...Array.from({ length: 8 }, (_, i) => `/${userId}/service/${i + 1}`),
      ],
    },
    {
      path: `/${userId}/qrcode`,
      label: 'Kod QR',
      openIcon: 'https://fobywatel.net/assets/app/images/identity_open.png',
      closeIcon: 'https://fobywatel.net/assets/app/images/identity.png',
      activePaths: [
        `/${userId}/qrcode`,
        `/${userId}/qrcode/scan`,
        `/${userId}/qrcode/show`,
      ],
    },
    {
      path: `/${userId}/more`,
      label: 'Więcej',
      openIcon: 'https://fobywatel.net/assets/app/images/other_open.png',
      closeIcon: 'https://fobywatel.net/assets/app/images/other.png',
      activePaths: [
        `/${userId}/more`,
        `/${userId}/more/1`,
        `/${userId}/more/2`,
        `/${userId}/more/3`,
        `/${userId}/more/5`,
      ],
    },
  ];

  return (
      <nav className="fixed bottom-1 py-1 left-0 right-0 bg-[#f5f6fb] border-t border-gray-200 z-50">
        <div className="flex items-center justify-around max-w-md mx-auto py-2">
          {navItems.map((item) => {
            const isActive = item.activePaths.includes(location.pathname);

            return (
                <Link
                    key={item.path}
                    to={item.path}
                    className="flex flex-col items-center justify-center flex-1"
                >
                  <div className="-translate-y-2 flex flex-col items-center">
                    <img
                        src={isActive ? item.openIcon : item.closeIcon}
                        alt={item.label}
                        className="w-6 h-6 transition duration-200"
                    />
                    <span
                        className={`text-xs mt-1 ${
                            isActive ? 'text-[#03418a] font-semibold' : 'text-gray-500'
                        }`}
                    >
                  {item.label}
                </span>
                  </div>
                </Link>
            );
          })}
        </div>
      </nav>
  );
};

export default Navigation;