import React, { useEffect, useRef, useCallback } from 'react';

export interface Bubble {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  hue: number;
}

export interface BubbleBackgroundConfig {
  bubbleCount?: number;
  minRadius?: number;
  maxRadius?: number;
  speed?: number;
  mouseInfluenceRadius?: number;
  mouseInfluenceStrength?: number;
}

const DEFAULT_CONFIG: Required<BubbleBackgroundConfig> = {
  bubbleCount: 30,
  minRadius: 10,
  maxRadius: 40,
  speed: 0.5,
  mouseInfluenceRadius: 200,
  mouseInfluenceStrength: 2,
};

export class BubbleEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private bubbles: Bubble[] = [];
  private mousePosition = { x: -1000, y: -1000 };
  private animationId: number = 0;
  private config: Required<BubbleBackgroundConfig>;
  private isRunning = false;

  constructor(canvas: HTMLCanvasElement, config: BubbleBackgroundConfig = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.init();
  }

  private init(): void {
    this.resize();
    this.createBubbles();
    window.addEventListener('resize', () => this.resize());
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private createBubbles(): void {
    this.bubbles = [];
    for (let i = 0; i < this.config.bubbleCount; i++) {
      this.bubbles.push(this.createBubble(true));
    }
  }

  private createBubble(randomY: boolean = false): Bubble {
    const radius = Math.random() * (this.config.maxRadius - this.config.minRadius) + this.config.minRadius;
    return {
      x: Math.random() * this.canvas.width,
      y: randomY ? Math.random() * this.canvas.height : this.canvas.height + radius,
      radius,
      vx: (Math.random() - 0.5) * this.config.speed,
      vy: -Math.random() * this.config.speed - 0.2,
      opacity: Math.random() * 0.3 + 0.1,
      hue: Math.random() * 60 + 180,
    };
  }

  public updateMouse(x: number, y: number): void {
    this.mousePosition = { x, y };
  }

  private update(): void {
    this.bubbles.forEach((bubble, index) => {
      const dx = bubble.x - this.mousePosition.x;
      const dy = bubble.y - this.mousePosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.config.mouseInfluenceRadius) {
        const force = (1 - distance / this.config.mouseInfluenceRadius) * this.config.mouseInfluenceStrength;
        bubble.vx += (dx / distance) * force;
        bubble.vy += (dy / distance) * force;
      }

      bubble.x += bubble.vx;
      bubble.y += bubble.vy;

      bubble.vx *= 0.98;
      bubble.vy *= 0.98;

      bubble.vy -= 0.01;
      bubble.vx += (Math.random() - 0.5) * 0.02;

      if (bubble.y < -bubble.radius * 2 || 
          bubble.x < -bubble.radius * 2 || 
          bubble.x > this.canvas.width + bubble.radius * 2) {
        this.bubbles[index] = this.createBubble();
      }
    });
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.bubbles.forEach((bubble) => {
      const gradient = this.ctx.createRadialGradient(
        bubble.x, bubble.y, 0,
        bubble.x, bubble.y, bubble.radius
      );
      gradient.addColorStop(0, `hsla(${bubble.hue}, 70%, 60%, ${bubble.opacity})`);
      gradient.addColorStop(0.5, `hsla(${bubble.hue}, 70%, 50%, ${bubble.opacity * 0.5})`);
      gradient.addColorStop(1, 'hsla(200, 70%, 50%, 0)');

      this.ctx.beginPath();
      this.ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(
        bubble.x - bubble.radius * 0.3, 
        bubble.y - bubble.radius * 0.3, 
        bubble.radius * 0.2, 
        0, 
        Math.PI * 2
      );
      this.ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.5})`;
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `hsla(${bubble.hue}, 70%, 60%, ${bubble.opacity * 0.3})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });
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

interface BubbleBackgroundProps {
  config?: BubbleBackgroundConfig;
  className?: string;
}

export const BubbleBackground: React.FC<BubbleBackgroundProps> = ({ config, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<BubbleEngine | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (engineRef.current) {
      engineRef.current.updateMouse(e.clientX, e.clientY);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    engineRef.current = new BubbleEngine(canvasRef.current, config);
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

export const createBubbleBackground = (type: 'default' | 'dense' | 'sparse', config?: BubbleBackgroundConfig) => {
  const presets = {
    default: {},
    dense: { bubbleCount: 50, minRadius: 15, maxRadius: 50 },
    sparse: { bubbleCount: 15, minRadius: 20, maxRadius: 60 },
  };
  return { ...presets[type], ...config };
};
