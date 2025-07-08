import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation  } from 'react-router-dom';
import Navigation from '../components/Navigation';
import PowodzPanel from "../components/PowodzPanel.tsx";
import {getUser} from "../utils/auth.tsx";


const ServicePage2: React.FC = () => {
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

    const from = location.state?.from || `/${userId}/services`;

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
                    to={from}
                    className="flex items-center gap-1 text-[#03418a] font-medium cursor-pointer select-none absolute left-4 top-1/2 transform -translate-y-1/2"
                >
                    <img
                        src="https://fobywatel.net/assets/app/images/back_blue.png"
                        alt="Wróć"
                        className="w-5 h-5 -ml-3"
                    />
                    <span className="text-base md:text-lg">Usługi</span>
                </Link>

                <h1 className="text-base md:text-lg font-medium text-gray-900">
                    Alert Powodziowy
                </h1>
            </header>

            <div className="px-4 pt-4">
                <div className="flex items-start mb-2">
                    <img
                        src="https://imgur.com/DhnpNKO.png"
                        alt="Ikona incydentu"
                        className="w-25 h-20 mr-2"
                    />
                </div>
                <h1
                    className="text-[30px] font-bold text-gray-900"
                >
                    Sprawdź oficjalne informacje o powodzi
                </h1>
                <p className="text-[15px] text-gray-500 pt-1">
                    Tu znajdziesz aktualne i potwierdzone dane.
                </p>
            </div>
            <div className="px-4 pt-2">
                <PowodzPanel />
            </div>
            <Navigation />
        </motion.div>
    );
};

export default ServicePage2;