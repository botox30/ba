import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
    return (
        <div
            className="flex flex-col items-center justify-center w-full h-screen bg-white bg-center bg-cover"
            style={{ backgroundImage: "url('https://fobywatel.net/assets/app/images/login.png')" }}
        >
            <motion.div
                className="flex items-center justify-center w-20 h-20 overflow-hidden"
                animate={{
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <img
                    src="https://fobywatel.net/assets/app/images/logo_large.png"
                    alt="Logo"
                    className="w-full h-full object-cover"
                />
            </motion.div>
            <motion.p
                className="mt-4 text-gray-600 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Ładowanie aplikacji...
            </motion.p>
        </div>
    );
};

export default LoadingScreen;