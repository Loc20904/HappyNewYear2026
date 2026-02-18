import { useMemo } from 'react';
import './Lanterns.css';

export default function Lanterns() {
    const lanterns = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => {
            const left = 5 + i * 12 + Math.random() * 5;
            const delay = Math.random() * 3;
            const duration = Math.random() * 2 + 3;
            const size = Math.random() * 20 + 40;
            const isGold = Math.random() > 0.6;

            return {
                id: i,
                left,
                delay,
                duration,
                size,
                isGold,
            };
        });
    }, []);

    return (
        <div className="lanterns-container">
            {lanterns.map(l => (
                <div
                    key={l.id}
                    className={`lantern ${l.isGold ? 'lantern-gold' : 'lantern-red'}`}
                    style={{
                        left: `${l.left}%`,
                        animationDelay: `${l.delay}s`,
                        animationDuration: `${l.duration}s`,
                        width: `${l.size}px`,
                    }}
                >
                    {/* String */}
                    <div className="lantern-string" />
                    {/* Top cap */}
                    <div className="lantern-cap" />
                    {/* Body */}
                    <div className="lantern-body">
                        <div className="lantern-glow" />
                        <span className="lantern-text">Tết</span>
                    </div>
                    {/* Bottom */}
                    <div className="lantern-bottom" />
                    {/* Tassel */}
                    <div className="lantern-tassel" />
                </div>
            ))}
        </div>
    );
}
