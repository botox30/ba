import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { getUser } from '../utils/auth';
import HologramEffect from "../components/HologramEffect.tsx";

interface ExpandableBoxProps {
    userData: any;
}

const ExpandableBox: React.FC<ExpandableBoxProps> = ({ userData }) => {
    const [expanded, setExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState('0px');
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        if (expanded) {
            setMaxHeight(`${contentRef.current?.scrollHeight ?? 0 + 20}px`);
            const timeout = setTimeout(() => setOpacity(1), 100);
            return () => clearTimeout(timeout);
        } else {
            setOpacity(0);
            const timeout = setTimeout(() => setMaxHeight('0px'), 300);
            return () => clearTimeout(timeout);
        }
    }, [expanded]);

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Brak danych';

    return date.toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

    return (
        <div
            className={`mt-6 w-[93%] max-w-md mx-auto rounded-[14px] bg-white shadow p-4 relative ${
                expanded ? '' : 'h-[67px]'
            }`}
        >
            <button
                onClick={() => setExpanded((prev) => !prev)}
                className="w-full flex justify-between items-center cursor-pointer focus:outline-none"
                aria-expanded={expanded}
                aria-controls="extra-data"
            >
                <span className="text-gray-800 font-semibold text-[16px] mt-2">Twoje dodatkowe dane</span>
                <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        expanded ? 'rotate-90' : 'rotate-0'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>

            <div
                id="extra-data"
                ref={contentRef}
                style={{
                    maxHeight: maxHeight, 
                    overflow: 'hidden',
                    transitionProperty: 'max-height, opacity',
                    transitionDuration: '0.3s, 0.3s',
                    transitionTimingFunction: 'ease-in-out, ease-in-out',
                    opacity: opacity,
                }}
                className="mt-4 flex flex-col gap-3"
            >
                <div>
                    <p className="text-xs text-gray-500">Nazwisko rodowe</p>
                    <p className="text-lg font-semibold text-gray-900">{userData?.nazwiskoRodowe || 'Brak danych'}</p>
                </div>
                <div className="mx-4 border-t border-gray-300"></div>

                <div>
                    <p className="text-xs text-gray-500">Płeć</p>
                    <p className="text-lg font-semibold text-gray-900">{userData?.plec || 'Brak danych'}</p>
                </div>
                <div className="mx-4 border-t border-gray-300"></div>

                <div>
                    <p className="text-xs text-gray-500">Nazwisko rodowe ojca</p>
                    <p className="text-lg font-semibold text-gray-900">{userData?.nazwiskoRodoweOjca || 'Brak danych'}</p>
                </div>

                <div className="mx-4 border-t border-gray-300"></div>

                <div>
                    <p className="text-xs text-gray-500">Nazwisko rodowe matki</p>
                    <p className="text-lg font-semibold text-gray-900">{userData?.nazwiskoRodoweMatki || 'Brak danych'}</p>
                </div>

                <div className="mx-4 border-t border-gray-300"></div>

                <div>
                    <p className="text-xs text-gray-500">Miejsce urodzenia</p>
                    <p className="text-lg font-semibold text-gray-900">{userData?.miejsceUrodzenia || 'Brak danych'}</p>
                </div>

                <div className="mx-4 border-t border-gray-300"></div>

                <div>
                    <p className="text-xs text-gray-500">Adres zameldowania na pobyt stały</p>
                    <p className="text-lg font-semibold text-gray-900">{userData?.miejsceZameldowania || 'Brak danych'}</p>
                    <p className="text-lg font-semibold text-gray-900">{userData?.miejsceZameldowania2 || 'Brak danych'}</p>
                </div>

                <div className="mx-4 border-t border-gray-300"></div>

                <div>
                    <p className="text-xs text-gray-500">Data zameldowania na pobyt stały</p>
                    <p className="text-lg font-semibold text-gray-900">
                        {userData?.dataZameldowania}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Card: React.FC = () => {
    const location = useLocation();
    const { id } = useParams();
    const [userData, setUserData] = useState<any>(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const scrollRef = useRef<HTMLDivElement>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [showSmallTitle, setShowSmallTitle] = useState(false);

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

    const from = location.state?.from || `/${userId}/home`;

    const icons = [
        { icon: 'https://imgur.com/Jg4gKRf.png', label: <>Potwierdź<br />swoje dane</>, to: `/${userId}/qrcode/scan` },
        { icon: 'https://imgur.com/DKlvRPb.png', label: <>Dane<br />dowodu osobistego</>, to: `/${userId}/carddocument` },
        { icon: 'https://imgur.com/jOr6sQB.png', label: <>Zastrzeż<br />Pesel</>, to: `/${userId}/reversepesel` },
        { icon: 'https://imgur.com/vtp6GgS.png', label: <>Pozostałe<br />Skrót</>, to: `/${userId}/shortcuts` },
    ];


    const formatTime = (date: Date) => {
        const pad = (n: number) => n.toString().padStart(2, '0');
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        const day = pad(date.getDate());
        const month = pad(date.getMonth() + 1);
        const year = date.getFullYear();
        return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

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
                    {showSmallTitle ? 'mDowód' : 'mDowód'}
                </h1>

                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                    <img
                        src="https://imgur.com/ajAdAWk.png"
                        alt="Pomoc"
                        className="w-5 h-5 object-contain"
                    />
                </div>
            </header>

            <div
                ref={scrollRef}
                className="h-[calc(100vh-80px)] overflow-y-auto bg-[#f3f4fb] pb-20"
            >
                <div className="text-gray-700 text-center py-2 text-[14px] mb-3 select-none">
                    Czas: {formatTime(currentTime)}
                </div>

                <div
                    className="relative w-[90%] h-[70%] max-w-lg rounded-[15px] bg-cover bg-center mx-auto flex flex-row p-6 gap-6"
                    style={{ backgroundImage: "url('https://i.imgur.com/Z0yXb5Q.png')" }}
                >
                    <div className="flex flex-col items-start gap-3">
                        <img
                            src={userData?.zdjecie || ''}
                            alt="Zdjęcie"
                            className="object-cover grayscale rounded-md shadow-md"
                            style={{ width: '35mm', height: '45mm' }}
                        />

                        <img
                            src="https://fobywatel.net/assets/app/images/flag.webp"
                            alt="Animacja"
                            className="w-[60px] h-auto rounded-md shadow-sm"
                        />

                        <div className="flex items-center gap-2">
                            <HologramEffect />
                            <span className="text-gray-400 text-xs leading-tight whitespace-pre-line">
                                Rzeczpospolita<br />Polska
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-start gap-1 -translate-y-1">
                        <span className="font-bold uppercase text-[16px] -mb-1">{userData?.imie || 'MARTA'}</span>
                        <span className="text-gray-700 font-medium text-[13px] mb-2">Imię (imiona)</span>

                        <span className="font-bold uppercase text-[16px] -mb-1">{userData?.nazwisko || 'NOWAK'}</span>
                        <span className="text-gray-700 font-medium text-[13px] mb-2">Nazwisko</span>

                        <span className="font-bold uppercase text-[16px] -mb-1">{userData?.obywatelstwo || 'POLSKIE'}</span>
                        <span className="text-gray-700 font-medium text-[13px] mb-2">Obywatelstwo</span>

                        <span className="font-bold uppercase text-[16px] -mb-1">{userData?.dataUrodzenia}</span>
                        <span className="text-gray-700 font-medium text-[13px] mb-2">Data urodzenia</span>

                        <span className="font-bold uppercase text-[16px] -mb-1">{userData?.pesel || 'BLABLA'}</span>
                        <span className="text-gray-700 font-medium text-[13px] mb-2">Numer Pesel</span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-b-[15px] shadow-md flex items-center justify-between px-5 py-4">
                        <div className="flex items-center gap-3">
                            <img
                                src="https://imgur.com/QjioagN.png"
                                alt="Logo"
                                className="w-7 h-7 object-contain"
                            />
                            <span className="text-green-600 font-semibold text-sm">
                                Dokument ważny
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 px-6 grid grid-cols-4 gap-1 text-center">
                    {icons.map(({ icon, label, to }, i) => (
                        <Link
                            key={i}
                            to={to}
                            className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center">
                                <img src={icon} alt="Ikona" className="w-6 h-6 sm:w-5 sm:h-5 object-contain" />
                            </div>
                            <div className="text-[13px] text-gray-800 font-normal leading-tight text-center whitespace-pre-line">
                                {label}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 h-[] w-[93%] relative rounded-[18px] shadow bg-white p-4 max-w-md mx-auto">
                    <button className="absolute top-6 right-3 px-4 py-1 text-[#03418a] bg-[#dce9fc] text-[12px] rounded-full font-bold hover:underline cursor-pointer">
                        Kopiuj
                    </button>

                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="text-xs text-gray-500">Seria i numer</p>
                            <p className="text-lg font-semibold text-gray-900">{userData?.seriaINumer || 'Duży tekst 1'}</p>
                        </div>

                        <div className="mx-4 border-t border-gray-300"></div>

                        <div>
                            <p className="text-xs text-gray-500">Termin ważności</p>
                            <p className="text-lg font-semibold text-gray-900">{userData?.dataWaznosci ? userData.dataWaznosci : 'Duży tekst 2'}</p>
                        </div>

                        <div className="mx-4 border-t border-gray-300"></div>

                        <div>
                            <p className="text-xs text-gray-500">Data wydania</p>
                            <p className="text-lg font-semibold text-gray-900">{userData?.dataWydania ? userData.dataWydania : 'Duży tekst 3'}</p>
                        </div>

                        <div className="mx-4 border-t border-gray-300"></div>
                        <div>
                            <p className="text-xs text-gray-500">Imię ojca</p>
                            <p className="text-lg font-semibold text-gray-900">{userData?.imieOjca || 'Duży tekst 3'}</p>
                        </div>

                        <div className="mx-4 border-t border-gray-300"></div>
                        <div>
                            <p className="text-xs text-gray-500">Imię matki</p>
                            <p className="text-lg font-semibold text-gray-900">{userData?.imieMatki || 'Duży tekst 3'}</p>
                        </div>
                    </div>
                </div>

                <ExpandableBox userData={userData} />
                <div className="relative mt-6 w-[93%] max-w-md mx-auto rounded-[14px] bg-white shadow p-4 flex items-center justify-between">
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
            </div>
            <Navigation />
        </motion.div>
    );
};

export default Card;
