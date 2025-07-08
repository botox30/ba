import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import {getUser} from "../utils/auth.tsx";

const ServicePage5: React.FC = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<'umowione' | 'zakonczone'>('umowione');
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
                    E-Wizyta w ZUS
                </h1>
            </header>
            <div className="bg-[#e5e6eb] mx-4 mt-3 rounded-[5px] p-1 flex justify-between gap-2">
                <button
                    onClick={() => setActiveTab('umowione')}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-[7px] transition-all duration-200 ${
                        activeTab === 'umowione'
                            ? 'bg-white shadow text-black-900'
                            : 'bg-transparent text-black-900'
                    }`}
                >
                    Umówione
                </button>
                <button
                    onClick={() => setActiveTab('zakonczone')}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-[7px] transition-all duration-200 ${
                        activeTab === 'zakonczone'
                            ? 'bg-white shadow text-black-900'
                            : 'bg-transparent text-black-900'
                    }`}
                >
                    Zakończone
                </button>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-6 flex-1">
                <div className="mt-12">
                    <img
                        src="https://imgur.com/mN0zxc4.png"
                        alt="Ikona punktu"
                        className="w-25 h-20 mb-4 mx-auto"
                    />
                    {activeTab === 'umowione' ? (
                        <>
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Tu zobaczysz swoje zaplanowane wideorozmowy
                            </h2>
                            <p className="text-sm text-gray-600">
                                Umów się na wideorozmowę z pracownikiem. <br />
                                ZUS. Wystarczy urządzenie z kamerką i <br />
                                mikrofonem.
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Tu zobaczysz zakończone rozmowy
                            </h2>
                        </>
                    )}
                </div>
            </div>
            <div className="px-6 mb-4">
                <button className="bg-[#03418a] text-white text-sm font-medium py-3 px-6 rounded-full w-full">
                    Umów nową
                </button>
            </div>

            <Navigation />
        </motion.div>
    );
};

export default ServicePage5;
