import { useEffect, useRef, useCallback } from 'react';

export interface CosmicParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export interface CosmicBackgroundConfig {
  starCount?: number;
  connectionDistance?: number;
  mouseInfluenceRadius?: number;
  mouseInfluenceStrength?: number;
  colors?: string[];
  speed?: number;
}

const DEFAULT_CONFIG: Required<CosmicBackgroundConfig> = {
  starCount: 150,
  connectionDistance: 120,
  mouseInfluenceRadius: 150,
  mouseInfluenceStrength: 0.5,
  colors: ['#3b82f6', '#8b5cf6', '#06b6d4', '#ec4899', '#10b981'],
  speed: 0.3,
};

export class CosmicEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: CosmicParticle[] = [];
  private mousePosition = { x: -1000, y: -1000 };
  private animationId: number = 0;
  private config: Required<CosmicBackgroundConfig>;
  private isRunning = false;

  constructor(canvas: HTMLCanvasElement, config: CosmicBackgroundConfig = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.init();
  }

  private init(): void {
    this.resize();
    this.createParticles();
    window.addEventListener('resize', () => this.resize());
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private createParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.config.starCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * this.config.speed,
        vy: (Math.random() - 0.5) * this.config.speed,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  public updateMouse(x: number, y: number): void {
    this.mousePosition = { x, y };
  }

  private update(): void {
    this.particles.forEach((particle) => {
      // Twinkle effect
      particle.twinklePhase += particle.twinkleSpeed;
      
      // Mouse influence
      const dx = this.mousePosition.x - particle.x;
      const dy = this.mousePosition.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < this.config.mouseInfluenceRadius) {
        const force = (1 - distance / this.config.mouseInfluenceRadius) * this.config.mouseInfluenceStrength;
        particle.vx += (dx / distance) * force * 0.5;
        particle.vy += (dy / distance) * force * 0.5;
      }

      // Apply velocity with damping
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Keep within bounds (wrap around)
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
    });
  }

  private draw(): void {
    // Clear canvas completely for transparent background
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections first (behind stars)
    this.drawConnections();

    // Draw stars
    this.particles.forEach((particle) => {
      const twinkle = Math.sin(particle.twinklePhase) * 0.3 + 0.7;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * twinkle})`;
      this.ctx.fill();

      // Add glow for larger stars
      if (particle.radius > 1.2) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        const gradient = this.ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 3
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${particle.opacity * twinkle * 0.3})`);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
      }
    });
  }

  private drawConnections(): void {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.connectionDistance) {
          const opacity = (1 - distance / this.config.connectionDistance) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private animate = (): void => {
    if (!this.isRunning) return;
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(this.animate);
  };

  public destroy(): void {
    this.stop();
    window.removeEventListener('resize', () => this.resize());
  }
}

interface CosmicBackgroundProps {
  config?: CosmicBackgroundConfig;
  className?: string;
}

export const CosmicBackground = ({ config, className = '' }: CosmicBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<CosmicEngine | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (engineRef.current) {
      engineRef.current.updateMouse(e.clientX, e.clientY);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    engineRef.current = new CosmicEngine(canvasRef.current, config);
    engineRef.current.start();

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (engineRef.current) {
        engineRef.current.destroy();
      }
    };
  }, [config, handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
    />
  );
};

// Export factory for creating different background types
export const createCosmicBackground = (type: 'default' | 'dense' | 'sparse', config?: CosmicBackgroundConfig) => {
  const presets = {
    default: {},
    dense: { starCount: 250, connectionDistance: 100 },
    sparse: { starCount: 80, connectionDistance: 150 },
  };
  return { ...presets[type], ...config };
};
