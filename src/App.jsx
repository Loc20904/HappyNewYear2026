import ParticleField from './components/ParticleField';
import Fireworks from './components/Fireworks';
import CherryBlossoms from './components/CherryBlossoms';
import Lanterns from './components/Lanterns';
import HorseAnimation from './components/HorseAnimation';
import HeroSection from './components/HeroSection';
import WishCard from './components/WishCard';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Background gradient */}
      <div className="background-gradient" />

      {/* Animation layers (z-index 1-5) */}
      <ParticleField />
      <Fireworks />
      <CherryBlossoms />
      <Lanterns />
      <HorseAnimation />

      {/* Content (z-index 10+) */}
      <main className="main-content">
        <HeroSection />
        <WishCard />
      </main>
    </div>
  );
}

export default App;
