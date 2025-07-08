import React, {useEffect, useRef, useState} from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import {getUser} from "../utils/auth.tsx";

const App: React.FC = () => {
    const location = useLocation();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showSmallTitle, setShowSmallTitle] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);


    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = scrollRef.current?.scrollTop ?? 0;
            setShowSmallTitle(scrollTop > 60);
        };

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

    const from = location.state?.from || `/${userId}/card`;

    return (
        <motion.div
            className="flex flex-col w-full h-full bg-[#f3f4fb]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <header className="sticky top-0 z-10 flex items-center justify-center px-4 py-4 bg-[#f3f4fb] relative">
                <Link
                    to={from}
                    className="flex items-center gap-1 text-[#03418a] font-medium cursor-pointer select-none absolute left-4 top-1/2 transform -translate-y-1/2"
                >
                    <img
                        src="https://fobywatel.net/assets/app/images/back_blue.png"
                        alt="Wróć"
                        className="w-5 h-5 -ml-3"
                    />
                    <span className="text-base md:text-lg">Wróć</span>
                </Link>

                <h1 className={`text-base md:text-lg font-medium text-gray-900 transition-all duration-300`}>
                    {showSmallTitle ? 'Pozostałe skróty' : 'Pozostałe skróty'}
                </h1>
            </header>

            <div className="w-[93%] max-w-md mx-auto mt-4 bg-white rounded-[14px] shadow overflow-hidden">
                <div className="flex items-center justify-between px-4 py-5">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://imgur.com/SlNP6Ay.png"
                            alt="Ikona"
                            className="w-7 h-7"
                        />
                        <span className="text-base font-semibold text-gray-900">Mandaty</span>
                    </div>
                    <a href="/mandaty">
                        <img
                            src="https://imgur.com/Be6JC1f.png"
                            alt="Strzałka"
                            className="w-4 h-4"
                        />
                    </a>
                </div>
                <div className="border-t border-gray-200 mx-4" />
                <div className="flex items-center justify-between px-4 py-5">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://imgur.com/KD6kN6t.png"
                            alt="Ikona"
                            className="w-7 h-7"
                        />
                        <span className="text-base font-semibold text-gray-900">Wybory</span>
                    </div>
                    <a href="/mandaty">
                        <img
                            src="https://imgur.com/Be6JC1f.png"
                            alt="Strzałka"
                            className="w-4 h-4"
                        />
                    </a>
                </div>
            </div>
            <div className="w-[93%] max-w-md mx-auto mt-4 bg-white rounded-[14px] shadow p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src="https://imgur.com/HbaID8a.png"
                        alt="Ikona Usuń"
                        className="w-6 h-7"
                    />
                    <span className="text-base font-semibold text-red-600">Usuń dokument</span>
                </div>
            </div>
            <Navigation />
        </motion.div>
    );
};

export default App;
