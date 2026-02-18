import './HeroSection.css';

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                {/* Decorative top */}
                <div className="hero-decoration">
                    <span className="deco-star">✦</span>
                    <span className="deco-line" />
                    <span className="deco-diamond">◆</span>
                    <span className="deco-line" />
                    <span className="deco-star">✦</span>
                </div>

                <h2 className="hero-subtitle-top">— Năm Bính Ngọ —</h2>

                <h1 className="hero-title">
                    <span className="title-line">Chúc Mừng</span>
                    <span className="title-line title-main">Năm Mới</span>
                    <span className="title-year">2026</span>
                </h1>

                <p className="hero-subtitle">
                    Happy New Year — Tết Nguyên Đán
                </p>

                <div className="hero-wishes">
                    <span className="wish-char">Phúc</span>
                    <span className="wish-char">Lộc</span>
                    <span className="wish-char">Thọ</span>
                </div>

                <p className="hero-message">
                    Chúc bạn và gia đình một năm mới an khang thịnh vượng,
                    <br />vạn sự như ý, phúc lộc đầy nhà!
                </p>
            </div>
        </section>
    );
}
