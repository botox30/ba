import React, {useEffect, useRef, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import NotificationsSettings from '../components/NotificationsSettings';
import {getUser} from "../utils/auth.tsx";

const MorePage3: React.FC = () => {
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
                            Powiadomienia
                        </h1>
                    </div>
                </header>
                <NotificationsSettings />
                <Navigation />
            </div>
        </div>
    );
};

export default MorePage3;