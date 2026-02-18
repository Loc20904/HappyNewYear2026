import { useState } from 'react';
import './WishCard.css';

const wishes = [
    {
        title: 'An Khang Thịnh Vượng',
        meaning: 'Peace and Prosperity',
        icon: '🏮',
        description: 'Chúc bạn một năm mới bình an, sức khỏe dồi dào và công việc thuận lợi.',
    },
    {
        title: 'Phúc Lộc Thọ',
        meaning: 'Happiness, Prosperity & Longevity',
        icon: '🧧',
        description: 'Ba điều ước truyền thống — phúc đức, tài lộc và trường thọ.',
    },
    {
        title: 'Vạn Sự Như Ý',
        meaning: 'May Everything Go As You Wish',
        icon: '🎋',
        description: 'Mọi điều bạn mong ước sẽ thành hiện thực trong năm mới.',
    },
    {
        title: 'Tấn Tài Tấn Lộc',
        meaning: 'Fortune and Wealth',
        icon: '💰',
        description: 'Tiền tài rủng rỉnh, lộc lá đầy nhà, làm ăn phát đạt.',
    },
    {
        title: 'Sức Khỏe Dồi Dào',
        meaning: 'Abundant Health',
        icon: '🌸',
        description: 'Sức khỏe là vàng — chúc bạn luôn mạnh khỏe, tràn đầy năng lượng.',
    },
    {
        title: 'Gia Đình Hạnh Phúc',
        meaning: 'Happy Family',
        icon: '🏡',
        description: 'Gia đình sum vầy, ấm áp, tràn ngập tiếng cười.',
    },
];

export default function WishCard() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseMove = (e, index) => {
        if (hoveredIndex !== index) return;
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        setHoveredIndex(null);
    };

    return (
        <section className="wish-section">
            <div className="wish-section-header">
                <h2 className="wish-section-title">Lời Chúc Năm Mới</h2>
                <p className="wish-section-subtitle">New Year Wishes</p>
                <div className="wish-section-divider">
                    <span />
                    <span className="divider-icon">✦</span>
                    <span />
                </div>
            </div>

            <div className="wish-grid">
                {wishes.map((wish, i) => (
                    <div
                        key={i}
                        className="wish-card"
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseMove={(e) => handleMouseMove(e, i)}
                        onMouseLeave={handleMouseLeave}
                        style={{ animationDelay: `${i * 0.15}s` }}
                    >
                        <div className="wish-card-glow" />
                        <div className="wish-card-icon">{wish.icon}</div>
                        <h3 className="wish-card-title">{wish.title}</h3>
                        <p className="wish-card-meaning">{wish.meaning}</p>
                        <p className="wish-card-desc">{wish.description}</p>
                        <div className="wish-card-border" />
                    </div>
                ))}
            </div>
        </section>
    );
}
