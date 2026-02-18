import { useMemo } from 'react';
import './ParticleField.css';

export default function ParticleField() {
    const stars = useMemo(() => {
        return Array.from({ length: 60 }, (_, i) => ({
            id: i,
            style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
            },
        }));
    }, []);

    return (
        <div className="particle-field">
            {stars.map(star => (
                <div key={star.id} className="star" style={star.style} />
            ))}
        </div>
    );
}
