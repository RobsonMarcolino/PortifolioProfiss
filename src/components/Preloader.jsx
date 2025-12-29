import React, { useEffect, useState } from 'react';

const Preloader = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);
    const [isExit, setIsExit] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 1;
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsExit(true); // Start fade out
                        setTimeout(onFinish, 800);
                    }, 200);
                    return 100;
                }
                return next;
            });
        }, 20); // 2 second load

        return () => clearInterval(timer);
    }, [onFinish]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700 ease-in-out ${isExit ? 'opacity-0 backdrop-blur-none pointer-events-none' : 'opacity-100 backdrop-blur-xl bg-white/10 dark:bg-black/20'
                }`}
        >
            {/* Glass Card */}
            <div className={`relative p-8 md:p-12 rounded-3xl bg-white/40 dark:bg-black/40 shadow-2xl border border-white/20 dark:border-white/10 backdrop-blur-md flex flex-col items-center gap-6 transition-all duration-500 transform ${isExit ? 'scale-90' : 'scale-100'}`}>

                {/* Modern Spinner */}
                <div className="relative w-16 h-16">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-gray-300/30"
                        />
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray="175"
                            strokeDashoffset={175 - (175 * progress) / 100}
                            className="text-[#FFC107] transition-all duration-75 ease-linear"
                            strokeLinecap="round"
                        />
                    </svg>
                    {/* Centered Logo/Icon */}
                    <div className="absolute inset-0 flex items-center justify-center font-black text-xs text-gray-800 dark:text-white">
                        RM
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">
                        Robson Marcolino
                    </h2>
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-[0.2em] opacity-80">
                        {progress < 100 ? 'Loading Experience...' : 'Welcome'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
