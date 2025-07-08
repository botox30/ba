import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import {getUser} from "../utils/auth.tsx";

const QRCodeScan: React.FC = () => {
    const location = useLocation();
    const [userId, setUserId] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const [cameraAllowed, setCameraAllowed] = useState(false);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                    setCameraAllowed(true);
                }
            })
            .catch(() => {
                setCameraAllowed(false);
            });

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach(track => track.stop());
            }
        };
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

    const from = location.state?.from || `/${userId}/qrcode`;

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
                    <span className="text-base md:text-lg">Kod QR</span>
                </Link>

                <h1 className="text-base md:text-lg font-medium text-gray-900">
                    Zeskanuj kod QR
                </h1>
            </header>

            <p className="text-[15px] text-gray-800 font-medium ml-5 mt-5">
                Umieść kod QR w ramce, aby go zeskanować.
            </p>

            <div
                className="mx-4 mt-4 rounded-[20px] bg-black w-[90%] max-w-4xl mx-auto overflow-hidden flex flex-col items-center justify-start"
                style={{ minHeight: '65vh', aspectRatio: '16 / 9', position: 'relative' }}
            >
                <div className="bg-[#fef1cf] text-gray-900 rounded-[14px] px-4 py-4 flex items-start gap-2 w-[90%] mt-4 shadow-md relative">
                    <img
                        src="https://imgur.com/m98mx9e.png"
                        alt="Info Ikona"
                        className="w-4 h-4 mt-1 flex-shrink-0"
                    />
                    <div className="text-xs sm:text-sm flex-1">
                        <p>
                            Upewnij się, że kod QR pochodzi z <br />wiarygodnego źródła.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-gray-700 focus:outline-none ml-2"
                        aria-label="Zamknij alert"
                        onClick={() => {}}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className="relative"
                    style={{
                        marginTop: '1rem',
                        width: '14rem',
                        height: '250px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        backgroundColor: 'black',
                        borderRadius: '0.5rem',
                        overflow: 'visible',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {cameraAllowed ? (
                        <video
                            ref={videoRef}
                            className="w-[155] h-full object-cover"
                            playsInline
                            muted
                        />
                    ) : (
                        <div className="frame-border">
                            <div className="corner top-left" />
                            <div className="corner top-right" />
                            <div className="corner bottom-left" />
                            <div className="corner bottom-right" />
                        </div>
                    )}
                </div>
            </div>
            <div className="fixed bottom-[100px] left-0 right-0 px-4">
                <button
                    className="w-full border-2 border-[#03418a] text-[#03418a] py-3 rounded-full text-[17px] font-medium shadow bg-transparent hover:bg-[#03418a] hover:text-white transition-colors"
                >
                    Wpisz kod
                </button>
            </div>

            <Navigation />
        </motion.div>
    );
};

export default QRCodeScan;