import { useMemo } from 'react';
import './CherryBlossoms.css';

export default function CherryBlossoms() {
    const petals = useMemo(() => {
        return Array.from({ length: 30 }, (_, i) => {
            const size = Math.random() * 12 + 8;
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 8 + 10;
            const isReverse = Math.random() > 0.5;
            const opacity = Math.random() * 0.5 + 0.4;
            const hue = Math.random() > 0.5 ? 340 : 45; // pink (đào) or yellow (mai)
            const saturation = Math.random() * 20 + 70;
            const lightness = Math.random() * 15 + 75;

            return {
                id: i,
                style: {
                    left: `${left}%`,
                    width: `${size}px`,
                    height: `${size}px`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    opacity: opacity,
                    backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                    animationName: isReverse ? 'sakuraFallReverse' : 'sakuraFall',
                    filter: `blur(${Math.random() > 0.7 ? 1 : 0}px)`,
                },
            };
        });
    }, []);

    return (
        <div className="cherry-blossoms-container">
            {petals.map(petal => (
                <div key={petal.id} className="petal" style={petal.style}>
                    <div className="petal-inner" />
                </div>
            ))}
        </div>
    );
}
