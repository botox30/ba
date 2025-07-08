import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import {getUser} from "../utils/auth.tsx";

const MorePage5: React.FC = () => {
    const location = useLocation();
    const [userId, setUserId] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [activeTab, setActiveTab] = useState<'wazne' | 'niewazne'>('wazne');

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

        const from = location.state?.from || `/${userId}/more`;


    return (
        <div className="relative h-screen overflow-hidden bg-[#f3f4fb]">
            <div
                ref={scrollRef}
                className="h-[calc(100vh-80px)] overflow-y-auto pb-20"
            >
                {/* Header */}
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
                            <span className="text-base md:text-lg">Więcej</span>
                        </Link>
                        <h1 className="text-base md:text-lg font-medium text-gray-900">
                            Wydane certyfikaty
                        </h1>
                    </div>
                </header>

                {/* Tabs */}
                <div className="bg-[#e5e6eb] mx-4 mt-3 rounded-[7px] p-1 flex justify-between gap-2">
                    <button
                        onClick={() => setActiveTab('wazne')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-[7px] transition-all duration-200 ${
                            activeTab === 'wazne'
                                ? 'bg-white shadow text-black-900'
                                : 'bg-transparent text-black-900'
                        }`}
                    >
                        Ważne
                    </button>
                    <button
                        onClick={() => setActiveTab('niewazne')}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-[7px] transition-all duration-200 ${
                            activeTab === 'niewazne'
                                ? 'bg-white shadow text-black-900'
                                : 'bg-transparent text-black-900'
                        }`}
                    >
                        Nieważne
                    </button>
                </div>
                <div className="px-4 mt-4">
                    {activeTab === 'wazne' ? (
                        <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-gray-700 text-sm border border-gray-500 rounded-full px-3 py-1 flex items-center gap-1 w-fit">
                                    <img
                                        src="https://imgur.com/vnqWgJR.png"
                                        alt="Ikona statusu"
                                        className="w-4 h-4"
                                    />
                                    Ważny jeszcze: 126 dni
                                </span>
                                <h2 className="text-lg font-semibold mt-2">Urządzenie</h2>
                                <p className="text-sm text-gray-500">
                                    Certyfikat mDowodu
                                </p>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 mt-10">
                        </div>
                    )}
                </div>

                <Navigation />
            </div>
        </div>
    );
};

export default MorePage5;
