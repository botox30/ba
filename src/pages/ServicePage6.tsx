import React, {useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import {getUser} from "../utils/auth.tsx";

const ServicePage6: React.FC = () => {
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
            className="flex flex-col min-h-screen bg-[#f3f4fb]"
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
                    Bezpieczny autobus
                </h1>
            </header>
            <div className="flex-1 overflow-y-auto px-4 pt-6 pb-28">
                <div className="flex flex-col items-start text-left">
                    <img
                        src="https://imgur.com/qlsDDec.png"
                        alt="Ikona"
                        className="w-25 h-25 mb-4"
                    />
                    <h2 className="text-[30px] md:text-[30px] font-semibold text-gray-900 mb-1 leading-snug">
                        Sprawdź stan <br />techniczny autobusu
                    </h2>
                    <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                        Znajdziesz tu najważniejsze informacje<br/> o pojeździe, na przykład czy ma ważne badania<br/> techniczne i polisę OC.
                    </p>
                    <div className="bg-white rounded-xl p-4 shadow w-full mb-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">
                                    Numer rejestracyjny
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-4 text-sm border border-[#242424] rounded-[5px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-[82px] left-0 right-0 px-4">
                        <button
                            className="w-full bg-[#03418a] text-white py-3 rounded-full text-sm font-medium shadow"
                        >
                            Sprawdź pojazd
                        </button>
                    </div>
                </div>
            </div>
            <Navigation />
        </motion.div>
    );
};

export default ServicePage6;