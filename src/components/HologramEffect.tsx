import React, { useEffect, useState } from 'react';

const HologramEffect: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [requiresPermission, setRequiresPermission] = useState(false);

    useEffect(() => {
        const previouslyGranted = localStorage.getItem('motionPermissionGranted') === 'true';

        if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
            setRequiresPermission(true);

            if (previouslyGranted) {
                setPermissionGranted(true);
            }
        } else {
            setPermissionGranted(true);
        }
    }, []);

    useEffect(() => {
        if (!permissionGranted) return;

        const handleOrientation = (e: DeviceOrientationEvent) => {
            const x = e.gamma || 0;
            const y = e.beta || 0;
            setPosition({ x: x * 2, y: y * 2 });
        };

        window.addEventListener('deviceorientation', handleOrientation);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, [permissionGranted]);

    const requestPermission = async () => {
        try {
            const result = await DeviceOrientationEvent.requestPermission();
            if (result === 'granted') {
                localStorage.setItem('motionPermissionGranted', 'true');
                setPermissionGranted(true);
            } else {
                alert('Aby uruchomić efekt hologramu, musisz zezwolić na dostęp do czujników.');
            }
        } catch (err) {
            console.error(err);
            alert('Błąd przy próbie uzyskania dostępu do animacji.');
        }
    };

    return (
        <div className="relative w-[40px] h-[40px] overflow-hidden">
            <img
                src="/hologram_emblem_monochromatic.webp"
                alt="Orzeł"
                className="w-full h-full object-contain"
            />
            <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                    backgroundImage: `
                        linear-gradient(135deg, rgba(255,0,0,0.2), rgba(255,255,0,0.2), rgba(0,255,255,0.2), rgba(0,0,255,0.2), rgba(255,0,255,0.2)),
                        url(/hologram_overlay.webp)
                    `,
                    backgroundSize: '800% 800%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: `${50 + position.x}% ${50 + position.y}%`,
                    mixBlendMode: 'screen',
                    opacity: 0.65,
                    filter: 'brightness(1.2) saturate(1.5)',
                    animation: 'shineLoop 5s linear infinite',
                }}
            />
            {requiresPermission && !permissionGranted && (
                <button
                    onClick={requestPermission}
                    className="absolute bottom-0 left-0 right-0 text-[10px] bg-black bg-opacity-60 text-white px-1 py-0.5 z-20"
                >
                    Aktywuj efekt
                </button>
            )}
            <style>{`
                @keyframes shineLoop {
                    0%   { background-position: 20% 40%; }
                    25%  { background-position: 80% 60%; }
                    50%  { background-position: 40% 80%; }
                    75%  { background-position: 60% 20%; }
                    100% { background-position: 20% 40%; }
                }
            `}</style>
        </div>
    );
};

export default HologramEffect;