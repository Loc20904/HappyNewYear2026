import { useEffect, useRef } from 'react';

export default function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let fireworks = [];
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      '#FFD700', '#FF6B35', '#D4213D', '#FF1493',
      '#00FFFF', '#FF4500', '#FFB7B2', '#FFA500',
      '#FF69B4', '#ADFF2F', '#FF0000', '#FFFF00',
    ];

    class Particle {
      constructor(x, y, color, velocity, size, type = 'circle') {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
        this.size = size;
        this.type = type;
        this.gravity = 0.04;
        this.friction = 0.98;
        this.trail = [];
        this.maxTrail = type === 'sparkle' ? 3 : 6;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
        if (this.trail.length > this.maxTrail) this.trail.shift();

        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
      }

      draw(ctx) {
        // Draw trail
        for (let i = 0; i < this.trail.length; i++) {
          const t = this.trail[i];
          const trailAlpha = (i / this.trail.length) * this.alpha * 0.4;
          ctx.beginPath();
          ctx.arc(t.x, t.y, this.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = this.color.replace(')', `, ${trailAlpha})`).replace('rgb', 'rgba');
          ctx.fill();
        }

        ctx.save();
        ctx.globalAlpha = this.alpha;

        if (this.type === 'sparkle') {
          // Star shape
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const angle = (i * Math.PI) / 2;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(
              this.x + Math.cos(angle) * this.size * 2,
              this.y + Math.sin(angle) * this.size * 2
            );
          }
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        }

        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, this.color.replace(')', ', 0.3)').replace('rgb', 'rgba'));
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();
      }
    }

    class Firework {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * (canvas.height * 0.15) + canvas.height * 0.1;
        this.targetX = this.x + (Math.random() - 0.5) * 200;
        this.speed = Math.random() * 3 + 5;
        this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        this.velocity = {
          x: Math.cos(this.angle) * this.speed,
          y: Math.sin(this.angle) * this.speed,
        };
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.trail = [];
        this.maxTrail = 15;
        this.alive = true;
        this.size = 2.5;
      }

      toRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) this.trail.shift();

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.y <= this.targetY) {
          this.explode();
          this.alive = false;
        }
      }

      explode() {
        const particleCount = Math.floor(Math.random() * 60) + 80;
        const type = Math.random();
        const rgbColor = this.toRgb(this.color);

        if (type < 0.3) {
          // Chrysanthemum burst
          for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = Math.random() * 4 + 2;
            particles.push(new Particle(
              this.x, this.y, rgbColor,
              { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
              Math.random() * 2 + 1, 'circle'
            ));
          }
        } else if (type < 0.6) {
          // Double ring
          for (let ring = 0; ring < 2; ring++) {
            for (let i = 0; i < particleCount / 2; i++) {
              const angle = (Math.PI * 2 * i) / (particleCount / 2);
              const speed = (ring + 1) * 2.5 + Math.random();
              const c = ring === 0 ? rgbColor : this.toRgb(colors[(colors.indexOf(this.color) + 3) % colors.length]);
              particles.push(new Particle(
                this.x, this.y, c,
                { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
                Math.random() * 1.5 + 0.8, 'circle'
              ));
            }
          }
        } else if (type < 0.8) {
          // Sparkle burst
          for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 1;
            particles.push(new Particle(
              this.x, this.y, rgbColor,
              { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
              Math.random() * 1.5 + 0.5, 'sparkle'
            ));
          }
        } else {
          // Willow / cascade
          for (let i = 0; i < particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            const p = new Particle(
              this.x, this.y, rgbColor,
              { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
              Math.random() * 2 + 1, 'circle'
            );
            p.gravity = 0.08;
            p.decay = Math.random() * 0.008 + 0.006;
            p.maxTrail = 12;
            particles.push(p);
          }
        }
      }

      draw(ctx) {
        // Draw trail
        for (let i = 0; i < this.trail.length; i++) {
          const t = this.trail[i];
          const alpha = i / this.trail.length;
          ctx.beginPath();
          ctx.arc(t.x, t.y, this.size * alpha, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 200, 100, ${alpha * 0.6})`;
          ctx.fill();
        }

        // Draw firework head
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#FFE4B5';
        ctx.fill();

        // Head glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
        g.addColorStop(0, 'rgba(255, 228, 181, 0.4)');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fill();
      }
    }

    let lastLaunch = 0;
    const launchInterval = () => Math.random() * 800 + 400;
    let nextLaunch = launchInterval();

    const animate = (timestamp) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      // Launch new fireworks
      if (timestamp - lastLaunch > nextLaunch) {
        const count = Math.random() < 0.3 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          fireworks.push(new Firework());
        }
        lastLaunch = timestamp;
        nextLaunch = launchInterval();
      }

      // Update & draw fireworks
      fireworks = fireworks.filter(f => {
        f.update();
        if (f.alive) f.draw(ctx);
        return f.alive;
      });

      // Update & draw particles
      particles = particles.filter(p => {
        p.update();
        if (p.alpha > 0.01) p.draw(ctx);
        return p.alpha > 0.01;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
