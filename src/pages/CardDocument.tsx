import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { getUser } from '../utils/auth.tsx';

const CardDocument: React.FC = () => {
    const location = useLocation();
    const [userId, setUserId] = useState<string | null>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            if (user?.id) {
                setUserId(user.id);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUser();
            if (user?.data) {
                setUserData(user.data);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
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
                    <span className="text-base md:text-lg">Wróć</span>
                </Link>

                <h1 className="text-base md:text-lg font-medium ml-5 text-gray-900">
                    Dane dowodu osobistego
                </h1>
            </header>
            <div className="mt-8 h-[] w-[93%] relative rounded-[18px] shadow bg-white p-4 max-w-md mx-auto">
                <button className="absolute top-6 right-3  px-4 py-1 text-[#03418a] bg-[#dce9fc] text-[12px] rounded-full font-bold hover:underline cursor-pointer">
                    Kopiuj
                </button>
                <div className="flex flex-col gap-3">
                    <div>
                        <p className="text-xs text-gray-500">Seria i numer</p>
                        <p className="text-lg font-semibold text-gray-900">{userData?.seriaINumer}</p>
                    </div>
                    <div className="mx-4 border-t border-gray-300"></div>
                    <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <div className="flex items-center gap-2">
                            <img
                                src="https://imgur.com/dMk884D.png"
                                alt="Ikona"
                                className="w-5 h-5"
                            />
                            <p className="text-lg font-semibold text-gray-900">Wydany</p>
                        </div>
                    </div>
                    <div className="mx-4 border-t border-gray-300"></div>
                    <div>
                        <p className="text-xs text-gray-500">Organ wydający</p>
                        <p className="text-lg font-semibold text-gray-900">{userData?.organWydajacy}</p>
                    </div>
                    <div className="mx-4 border-t border-gray-300"></div>
                    <div>
                        <p className="text-xs text-gray-500">Termin ważności</p>
                        <p className="text-lg font-semibold text-gray-900">{userData?.dataWaznosci}</p>
                    </div>
                    <div className="mx-4 border-t border-gray-300"></div>
                    <div>
                        <p className="text-xs text-gray-500">Data wydania</p>
                        <p className="text-lg font-semibold text-gray-900">{userData?.dataWydania}</p>
                    </div>
                </div>
            </div>
            <div className="relative mt-4 w-[93%] max-w-md mx-auto rounded-[14px] bg-white shadow p-4 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Ostatnia aktualizacja</span>
                    <span className="text-lg font-semibold text-gray-900">
                            {currentTime.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </span>
                </div>
                <button
                    className="absolute top-6 right-3 px-4 py-1 text-[#03418a] bg-[#dce9fc] text-[12px] rounded-full font-bold hover:underline cursor-pointer"
                >
                    Aktualizuj
                </button>
            </div>
            <div className="relative mt-4 w-[93%] max-w-md mx-auto rounded-[14px] bg-white shadow p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src="https://imgur.com/9En8MV7.png"
                        alt="Ikona"
                        className="w-6 h-8"
                    />
                    <span className="text-base font-semibold text-gray-900">
                            Zmień PIN do<br/>podpisu osobistego
                     </span>
                </div>
                <span className="text-xl text-gray-400 font-bold">{'>'}</span>
            </div>
            <Navigation />
        </motion.div>
    );
};

export default CardDocument;
