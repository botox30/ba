import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, AlertTriangle, Wind } from 'lucide-react';
import { getUser } from '../utils/auth.tsx';

interface ServiceGridProps {
  extended?: boolean;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ extended = false }) => {
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

  const services = [
    {
      id: 1,
      title: 'Bezpiecznie w sieci',
      icon: "https://imgur.com/bZwkDoJ.png",
      path: `/${userId}/service/1`,
      bgColor: 'bg-purple-50',
    },
    {
      id: 2,
      title: 'Alert powodziowy',
      icon: "https://imgur.com/deNseRP.png",
      path: `/${userId}/service/2`,
      bgColor: 'bg-blue-50',
    },
    {
      id: 3,
      title: 'Jakość powietrza',
      icon: "https://imgur.com/wQrZqko.png",
      path: `/${userId}/service/3`,
    },
    {
      id: 4,
      title: 'Historia pojazdu',
      icon: "https://imgur.com/CAhSVee.png",
      path: `/${userId}/service/4`,
      bgColor: 'bg-green-50',
    },
    {
      id: 5,
      title: 'E-wizyta w ZUS',
      icon: "https://imgur.com/Go2Q549.png",
      path: `/${userId}/service/5`,
      bgColor: 'bg-green-50',
    },
    {
      id: 6,
      title: 'Bezpieczny autobus',
      icon: "https://imgur.com/ZYnpBN1.png",
      path: `/${userId}/service/6`,
      bgColor: 'bg-blue-50',
    },
  ];

  const extendedServices = [
    ...services,
    {
      id: 7,
      title: 'Status kwarantanny',
      icon: <Globe className="w-8 h-8 text-red-600" />,
      path: `/${userId}/service/7`,
      bgColor: 'bg-red-50',
    },
    {
      id: 8,
      title: 'e-Recepty',
      icon: <AlertTriangle className="w-8 h-8 text-blue-600" />,
      path: `/${userId}/service/8`,
      bgColor: 'bg-blue-50',
    },
    {
      id: 9,
      title: 'Informacje wyborcze',
      icon: <Wind className="w-8 h-8 text-indigo-600" />,
      path: `/${userId}/service/9`,
      bgColor: 'bg-indigo-50',
    },
  ];

  const displayServices = extended ? extendedServices : services;

  return (
      <div className="w-full max-w-[1024px] mx-auto sm:px-[20px] md:px-[64px]">
        <motion.div
            className="grid grid-cols-3 gap-12 gap-y-[1px] w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.05 }}
        >
          {displayServices.map((service) => (
              <Link key={service.id} to={service.path} className="flex justify-center">
                <motion.div
                    className="relative flex flex-col items-center w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ minHeight: '160px' }}
                >
                  <div className="absolute mb-5 inset-x-0 m-auto w-[80px] h-[80px] pointer-events-none">
                    <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" fill="white" className="w-full h-full">
                      <path d="M 0 140 C 0 2.8, 2.8 0, 140 0 S 280 2.8, 280 140, 277.2 280, 140 280, 0 277.2, 0 140" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-center w-20 h-20 relative mb-1">
                    {typeof service.icon === 'string' ? (
                        <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain" />
                    ) : (
                        service.icon
                    )}
                  </div>

                  <div className="w-full px-1 mt-1 flex items-start justify-center" style={{ height: '36px' }}>
                    <p
                        className="font-medium text-gray-600 text-opacity-[0.8] text-center"
                        style={{ fontSize: 'clamp(14px, 3.4vw, 10px)', lineHeight: 1.4, maxWidth: '100px' }}
                    >
                      {service.title}
                    </p>
                  </div>
                </motion.div>
              </Link>
          ))}
        </motion.div>
      </div>
  );
};

export default ServiceGrid;