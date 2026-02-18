import './DragonAnimation.css';

export default function DragonAnimation() {
    return (
        <div className="dragon-container">
            <div className="dragon">
                <div className="dragon-body">
                    {/* Dragon segments for serpentine motion */}
                    <div className="dragon-segment dragon-head">
                        <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 30 Q20 5, 50 15 Q70 20, 85 10 Q95 8, 98 15 L95 25 Q90 22, 85 25 Q70 30, 60 28 Q50 35, 40 32 Q30 38, 20 35 Q10 40, 5 30Z" fill="url(#dragonGrad)" />
                            <circle cx="80" cy="18" r="3" fill="#FFD700" />
                            <circle cx="80" cy="18" r="1.5" fill="#8B0000" />
                            {/* Horns */}
                            <path d="M75 12 Q78 2, 82 8" stroke="#FFD700" strokeWidth="1.5" fill="none" />
                            <path d="M70 14 Q72 4, 76 10" stroke="#FFD700" strokeWidth="1.5" fill="none" />
                            {/* Whiskers */}
                            <path d="M90 20 Q98 15, 100 10" stroke="#FFD700" strokeWidth="0.8" fill="none" />
                            <path d="M90 22 Q98 22, 100 25" stroke="#FFD700" strokeWidth="0.8" fill="none" />
                            {/* Mouth */}
                            <path d="M92 20 Q95 22, 92 24" stroke="#FF4500" strokeWidth="1" fill="#FF4500" />
                            <defs>
                                <linearGradient id="dragonGrad" x1="0" y1="0" x2="100" y2="60">
                                    <stop offset="0%" stopColor="#FFD700" />
                                    <stop offset="50%" stopColor="#FFA500" />
                                    <stop offset="100%" stopColor="#FF6B35" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    {Array.from({ length: 8 }, (_, i) => (
                        <div
                            key={i}
                            className="dragon-segment dragon-body-seg"
                            style={{
                                animationDelay: `${i * 0.12}s`,
                                opacity: 1 - i * 0.08,
                            }}
                        >
                            <svg viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <ellipse cx="20" cy="12" rx="18" ry="10" fill="url(#bodyGrad)" />
                                {/* Scales */}
                                <path d="M10 8 Q14 4, 18 8" stroke="rgba(139,0,0,0.3)" strokeWidth="0.5" fill="none" />
                                <path d="M18 8 Q22 4, 26 8" stroke="rgba(139,0,0,0.3)" strokeWidth="0.5" fill="none" />
                                <path d="M26 8 Q30 4, 34 8" stroke="rgba(139,0,0,0.3)" strokeWidth="0.5" fill="none" />
                                <defs>
                                    <linearGradient id="bodyGrad" x1="0" y1="0" x2="40" y2="24">
                                        <stop offset="0%" stopColor="#FFD700" />
                                        <stop offset="100%" stopColor="#FF8C00" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    ))}
                    <div className="dragon-segment dragon-tail">
                        <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 10 Q15 5, 30 10 Q40 15, 50 8 Q55 5, 60 10 Q55 14, 50 12 Q40 18, 30 12 Q15 16, 0 10Z" fill="url(#tailGrad)" />
                            <defs>
                                <linearGradient id="tailGrad" x1="0" y1="0" x2="60" y2="20">
                                    <stop offset="0%" stopColor="#FF8C00" />
                                    <stop offset="100%" stopColor="#FFD700" stopOpacity="0.5" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
