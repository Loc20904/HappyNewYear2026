import horseImg from '../assets/horse.png';
import './HorseAnimation.css';

export default function HorseAnimation() {
    return (
        <div className="horse-container">
            <div className="horse">
                <img src={horseImg} alt="Ngựa - Năm Bính Ngọ 2026" className="horse-img" />
            </div>
        </div>
    );
}
