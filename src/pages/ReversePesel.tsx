import React, {useEffect, useRef, useState} from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import {getUser} from "../utils/auth.tsx";

const ReversePesel: React.FC = () => {
    const location = useLocation();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showSmallTitle, setShowSmallTitle] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);
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
                    {showSmallTitle ? 'Zastrzeż PESEL' : 'Zastrzeż PESEL'}
                </h1>

                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                    <img
                        src="https://imgur.com/ajAdAWk.png"
                        alt="Pomoc"
                        className="w-5 h-5 object-contain"
                    />
                </div>
            </header>

            <div className="px-4 pt-4">
                <div className="flex items-start mb-2">
                    <img
                        src="https://imgur.com/uRJqJXW.png"
                        alt="Ikona incydentu"
                        className="w-20 h-20 mr-2"
                    />
                </div>
                <h1 className="text-[30px] font-bold text-gray-900">
                    Twój PESEL jest {isBlocked ? 'zastrzeżony' : 'niezastrzeżony'}
                </h1>
                <p className="text-[15px] text-gray-500 pt-1">
                    Zastrzeż PESEL, żeby nikt nie<br />wykorzystał go bez Twojej wiedzy.
                </p>
                <div className="relative mt-6 w-full max-w-md bg-white rounded-[14px] shadow p-5 mx-auto flex items-center justify-between">
                    <div className="text-[17px] text-black-800 font-medium">
                        Zastrzeż PESEL
                    </div>

                    <button
                        className="absolute top-5 right-4 px-4 py-1 text-[#03418a] bg-[#dce9fc] text-[12px] rounded-full font-bold hover:underline cursor-pointer"
                        onClick={() => setIsBlocked(true)}
                    >
                        Zastrzeż
                    </button>
                </div>
            </div>
            <div className="px-4 pt-4">
                <h2 className="text-[18px] font-bold text-gray-900 mb-4">Historia</h2>
                <div className="w-full max-w-md bg-white rounded-[14px] shadow mx-auto overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4">
                        <span className="text-[17px] font-medium text-gray-900">Kto sprawdzał TWÓJ PESEL</span>
                        <span className="text-gray-400 text-lg">{'>'}</span>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="flex items-center justify-between px-5 py-4">
                        <span className="text-[17px] font-medium text-gray-900">Twoje zmiany</span>
                        <span className="text-gray-400 text-lg">{'>'}</span>
                    </div>
                </div>
            </div>

            <Navigation />
        </motion.div>
    );
};

export default ReversePesel;
