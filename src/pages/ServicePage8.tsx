import React, {useEffect, useRef, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import {getUser} from "../utils/auth.tsx";

const ServicePage8: React.FC = () => {
    const location = useLocation();
    const [userId, setUserId] = useState<string | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
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

    const from = location.state?.from || `/${userId}/services`;

    return (
        <div className="relative h-screen overflow-hidden bg-[#f3f4fb]">
            <div
                ref={scrollRef}
                className="h-[calc(100vh-80px)] overflow-y-auto pb-20"
            >
                <header className="sticky top-0 z-10 bg-[#f3f4fb] px-4 py-4 flex flex-col gap-2 relative backdrop-blur-sm">
                    <div className="flex items-center justify-center relative h-[32px]">
                        <Link
                            to={from}
                            className="flex items-center gap-1 text-[#03418a] font-medium cursor-pointer select-none absolute left-4 top-1/2 transform -translate-y-1/2"
                        >
                            <img
                                src="https://fobywatel.net/assets/app/images/back_blue.png"
                                alt="Wróć"
                                className="w-5 h-5 -ml-7"
                            />
                            <span className="text-base md:text-lg">Usługi</span>
                        </Link>
                        <h1 className="text-base md:text-lg font-medium text-gray-900">
                            Uprawnienia kierowcy
                        </h1>
                    </div>
                </header>
                <div className="px-4 pt-5">
                    <div className="flex flex-col items-start text-left">
                        <img
                            src="https://imgur.com/uT5MRyD.png"
                            alt="Ikona"
                            className="w-25 h-25 mb-4"
                        />
                        <h2 className="text-[30px] md:text-[30px] font-semibold text-gray-900 mb-1 leading-snug">
                            Sprawdź uprawnienia <br />kierowcy
                        </h2>
                        <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                            Potwierdzisz tu dane i status prawa jazdy,<br/>tymczasowego prawa jazdy i pozwolenia na<br/>kierowanie tramwajem.
                        </p>
                        <div className="bg-white rounded-xl p-4 shadow w-full mb-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">
                                        Imię
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-4 text-sm border border-[#242424] rounded-[5px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 ">
                                        Nazwisko
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-4 text-sm border border-[#242424] rounded-[5px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 ">
                                        Numer Blankietu
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-4 text-sm border border-[#242424] rounded-[5px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <p className="text-[12px] text-[#03418a] font-bold mt-50">
                                    Gdzie znaleźć numer blankietu?
                                </p>
                            </div>
                        </div>
                        <div className="fixed bottom-0 left-0 right-0 bg-[#f3f4fb] border-t border-gray-200 pb-16 px-4 pt-4">
                            <button
                                className="w-full bg-[#03418a] text-white py-3 rounded-full text-sm font-medium shadow mb-3"
                            >
                                Sprawdź pojazd
                            </button>
                            <Navigation />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePage8;