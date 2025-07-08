import React, {useEffect, useRef, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import {Eye, EyeOff} from "lucide-react";
import {getUser} from "../utils/auth.tsx";

const MorePage1: React.FC = () => {
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

    const from = location.state?.from || `/${userId}/more`;

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
                            <span className="text-base md:text-lg">Więcej</span>
                        </Link>
                        <h1 className="text-base md:text-lg font-medium text-gray-900">
                            Zmiana hasła
                        </h1>
                    </div>
                </header>

                <div className="px-4 pt-5">
                    <div className="flex flex-col items-start text-left">
                        <img
                            src="https://imgur.com/4vPA21t.png"
                            alt="Ikona"
                            className="w-25 h-25 mb-4 ml-[-10px]"
                        />
                        <h2 className="text-[30px] md:text-[30px] font-semibold text-gray-900 mb-1 leading-snug">
                            Wpisz aktualne hasło
                        </h2>
                        <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                        </p>


                        <div className="bg-white rounded-xl shadow-sm px-4 py-3 w-[100%] max-w-md mx-auto">
                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className="block mb-1 text-[14px] font-medium text-gray-500"
                                >
                                    Hasło
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-[50px] px-6 pr-10 text-[15px] border border-gray-600 rounded-[5px] focus:outline-none focus:ring-1 focus:ring-[#03418a]"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-[#f3f4fb] border-t border-gray-200 pb-16 px-4 pt-4">
                <button
                    className="w-full bg-[#03418a] text-white py-3 rounded-full text-sm font-medium shadow mb-3"
                >
                    Dalej
                </button>
                <Navigation />
            </div>
        </div>
    );
};

export default MorePage1;