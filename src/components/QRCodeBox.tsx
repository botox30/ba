import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';

const generateRandomCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const QRCodeBox: React.FC = () => {
    const [code, setCode] = useState(generateRandomCode());
    const [timeLeft, setTimeLeft] = useState(180);
    const [progress, setProgress] = useState(100);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    const newCode = generateRandomCode();
                    setCode(newCode);
                    setProgress(100);
                    return 180;
                }
                return prev - 1;
            });

            setProgress(prev => Math.max(0, prev - (100 / 180)));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
        };

        const current = scrollRef.current;
        current?.addEventListener('scroll', handleScroll);

        return () => current?.removeEventListener('scroll', handleScroll);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="relative h-screen overflow-hidden bg-[#f3f4fb]">
            <div
                ref={scrollRef}
                className="h-[calc(100vh-80px)] overflow-y-auto w-full pb-20"
            >

                <motion.div
                    className="flex flex-col items-center justify-start w-full p-6  max-w-md mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-black text-xl font-semibold mb-4 text-center">
                        Pokaż kod QR osobie, której sprawdzasz dokument
                    </h2>

                    <p className="text-[15px] text-gray-500 font-medium  mt-2 mb-7 text-center">
                        Gdy ta osoba przepisze lub zeskanuje kod,<br />zobaczysz jej dane na swoim telefonie
                    </p>

                    <div className="bg-white min-h-[500px] p-6 rounded-2xl shadow-lg w-full flex flex-col justify-center items-center text-center">
                        <QRCode value={code} size={250} />
                        <div className="text-[50px] font-medium mt-4">{code}</div>

                        <div className="w-[90%] bg-gray-200 h-1 mt-4 rounded overflow-hidden">
                            <div
                                className="h-full bg-[#03418a] transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="mt-5 text-black-900 font-bold text-[15px]">
                            Kod wygaśnie za: {minutes} min {seconds < 10 ? `0${seconds}` : seconds} sek.
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-md w-full mt-6 flex justify-center gap-32">
                        <img
                            src="https://imgur.com/GqnUMqF.jpg"
                            alt="Left"
                            className="w-12 h-12 object-cover"
                        />
                        <img
                            src="https://imgur.com/nMCPStg.jpg"
                            alt="Right"
                            className="w-12 h-12 object-cover"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default QRCodeBox;
