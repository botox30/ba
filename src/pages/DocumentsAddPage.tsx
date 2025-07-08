import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { motion } from 'framer-motion';
import {getUser} from "../utils/auth.tsx";

const documents = [
    {
        name: ["Legitymacja", <br key="br1" />, "emeryta-rencisty"],
        icon: "https://imgur.com/0N1A5Qs.png",
    },
    {
        name: ["Karta Dużej Rodziny"],
        icon: "https://imgur.com/5uoXgKv.png",
    },
    {
        name: [
            "mPrawo jazdy",
            <br key="br2" />,
            <small key="tmp" className="text-gray-500 text-[14px]">(również tymczasowe)</small>,
        ],
        icon: "https://imgur.com/kREnX5r.png",
    },
    {
        name: ["Legitymacja Ulgowych Usług Transportowych"],
        icon: "https://imgur.com/2I1eKWz.png",
    },
];

const DocumentsAdd = () => {
    const [selected, setSelected] = useState<number[]>([]);
    const [showSmallTitle, setShowSmallTitle] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
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

    const toggle = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
        );
    };

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

    return (
        <div className="relative h-screen overflow-hidden">
            <div
                ref={scrollRef}
                className="h-[calc(100vh-80px)] overflow-y-auto bg-[#f3f4fb] pb-20"
            >
                <header
                    className="sticky top-0 z-10 bg-[#f3f4fb]/90 px-4 py-4 flex flex-col gap-2 relative backdrop-blur-sm"
                >
                    <div className="flex items-center justify-center relative h-[32px]">
                        <Link
                            to={`/${userId}/documents`}
                            className="flex items-center gap-1 text-[#03418a] font-medium cursor-pointer select-none absolute left-4 top-1/2 transform -translate-y-1/2"
                        >
                            <img
                                src="https://fobywatel.net/assets/app/images/back_blue.png"
                                alt="Wróć"
                                className="w-5 h-5 -ml-7"
                            />
                            <span className="text-base md:text-lg">Wróć</span>
                        </Link>

                        <motion.h1
                            className="absolute left-[30%] -translate-x-1/2 text-gray-900 font-extrabold"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: showSmallTitle ? 1 : 0,
                                scale: showSmallTitle ? 1 : 0.8,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            Wybierz dokumenty
                        </motion.h1>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showSmallTitle ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                    >
                        <input
                            type="text"
                            placeholder="Szukaj"
                            className="w-full pl-10 pr-2 py-2 rounded-[10px] bg-[#e5e6eb] font-bold placeholder-[#808286] text-gray-800 focus:outline-none"
                            style={{ lineHeight: '1.5', height: '40px' }}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img
                  src="https://i.imgur.com/ZUBPCT6.png"
                  alt="ikona wyszukiwania"
                  className="w-6 h-6"
              />
            </span>
                    </motion.div>
                </header>
                <div
                    className="px-4 pt-0"
                    style={{ marginTop: '-50px', position: 'relative', zIndex: 20 }}
                >
                    <motion.h1
                        className="text-[35px] font-black text-gray-900"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{
                            opacity: showSmallTitle ? 0 : 1,
                            scale: showSmallTitle ? 0.9 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        Wybierz dokumenty
                    </motion.h1>
                </div>

                <div className="px-4 pt-1">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Szukaj"
                            className="w-full pl-10 pr-2 py-2 rounded-[10px] bg-[#e5e6eb] font-bold placeholder-[#808286] text-gray-800 focus:outline-none"
                            style={{ lineHeight: '1.5', height: '40px' }}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img
                  src="https://i.imgur.com/ZUBPCT6.png"
                  alt="ikona wyszukiwania"
                  className="w-6 h-6"
              />
            </span>
                    </div>
                </div>

                <div className="px-4 pt-5">
                    <h2 className="font-medium text-[15px] text-gray-900 mb-2">
                        Zaznacz, które dokumenty chcesz dodać.
                    </h2>
                </div>

                <div className="px-4 pt-3 max-w-md mx-auto">
                    <div className="bg-white rounded-[10px] shadow-sm overflow-hidden">
                        {documents.map(({ name, icon }, index) => (
                            <label
                                key={index}
                                htmlFor={`doc-${index}`}
                                className="flex items-center cursor-pointer select-none border-b last:border-none"
                                style={{
                                    height: '90px',
                                    padding: '0 1rem',
                                    gap: '1rem',
                                }}
                            >
                                <input
                                    id={`doc-${index}`}
                                    type="checkbox"
                                    checked={selected.includes(index)}
                                    onChange={() => toggle(index)}
                                    className="cursor-pointer"
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '20%',
                                        appearance: 'none',
                                        backgroundColor: selected.includes(index)
                                            ? '#03418a'
                                            : '#fff',
                                        border: '2px solid #5c5c5c',
                                        cursor: 'pointer',
                                        flexShrink: 0,
                                        marginRight: '15px',
                                    }}
                                />
                                <img
                                    src={icon}
                                    alt={`Ikona dokumentu ${name}`}
                                    className="w-6 h-6 select-none flex-shrink-0"
                                    draggable={false}
                                    style={{ marginRight: '16px' }}
                                />
                                <span
                                    className="font-semibold text-gray-900 text-lg break-words"
                                    style={{ lineHeight: 1.2 }}
                                >
                  {Array.isArray(name)
                      ? name.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>)
                      : name}
                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="px-4 pt-5">
                    <h2 className="font-medium text-[15px] text-gray-900 mb-2">
                        Te dokumenty dodasz osobno, bo wymagają potwierdzenia tożsamości.
                    </h2>
                </div>

                <div className="px-4 pt-6 space-y-6">
                    <div>
                        <div className="bg-white rounded-[10px] shadow-sm p-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://imgur.com/UXC4mAS.png"
                                    alt="Dokument"
                                    className="w-8 h-8"
                                />
                                <span className="text-[18px] font-bold text-gray-900">mDowód</span>
                            </div>
                            <span className="text-gray-300 text-xl">{'>'}</span>
                        </div>
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 bg-[#f3f4fb] border-t border-gray-200 pb-16">
                        <div className="px-4 pt-4 pb-2">
                            <motion.button
                                disabled={selected.length === 0}
                                className={`w-full py-3 rounded-[30px] font-medium text-base shadow-md transition-colors duration-300 text-white ${
                                    selected.length > 0
                                        ? 'bg-[#03418a] hover:bg-[#0250a3] cursor-pointer'
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                                whileTap={selected.length > 0 ? { scale: 0.98 } : undefined}
                            >
                                Dodaj
                            </motion.button>
                        </div>
                        <Navigation />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentsAdd;
