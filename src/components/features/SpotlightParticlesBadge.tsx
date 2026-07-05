import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseAlpha: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

interface PropsBadge {
    badge: number[];
}

const SpotlightParticlesBadge = ({ badge }: PropsBadge) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const cursorDot = cursorDotRef.current;

        if (!canvas) return undefined;

        const ctx = canvas.getContext('2d');
        if (!ctx) return undefined;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let dotX = mouseX;
        let dotY = mouseY;
        let animationFrameId: number;

        const particles: Particle[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();

        for (let i = 0; i < 80; i++) {
            const baseAlpha = 0.25 + Math.random() * 0.45;

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: 1 + Math.random() * 2,
                baseAlpha,
                twinkleSpeed: 0.02 + Math.random() * 0.04,
                twinklePhase: Math.random() * Math.PI * 2,
            });
        }

        const handleMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const updateSpotlight = () => {
            if (!spotlightRef.current) return;

            spotlightRef.current.style.background = `
        radial-gradient(
          120px circle at ${mouseX}px ${mouseY}px,
          rgba(${badge[0]}, ${badge[1]}, ${badge[2]}, 0.22),
          transparent 65%
        )
      `;
        };

        const updateCursorDot = () => {
            if (!cursorDot) return;

            const speed = 0.14;

            dotX += (mouseX - dotX) * speed;
            dotY += (mouseY - dotY) * speed;

            cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
        };

        const draw = () => {
            const time = performance.now() * 0.001;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                const dx = mouseX - p.x;
                const dy = mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 250) {
                    p.x -= dx * 0.005;
                    p.y -= dy * 0.005;
                }

                const twinkle =
                    p.baseAlpha +
                    Math.sin(time * p.twinkleSpeed * 60 + p.twinklePhase) *
                        0.35;

                const finalAlpha = Math.max(0.15, Math.min(1, twinkle));

                ctx.beginPath();
                ctx.fillStyle = `rgba(${badge[0]}, ${badge[1]}, ${badge[2]}, ${finalAlpha})`;
                ctx.shadowColor = `rgba(${badge[0]}, ${badge[1]}, ${badge[2]}, ${finalAlpha})`;
                ctx.shadowBlur = 6 + finalAlpha * 14;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.shadowBlur = 0;
            });

            updateSpotlight();
            updateCursorDot();

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('resize', resizeCanvas);

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [badge]);

    return (
        <>
            <div
                ref={cursorDotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '3px',
                    height: '3px',
                    background: '#4ADE80',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                }}
            />

            <div
                ref={spotlightRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 5,
                    transition: 'background 0.1s linear',
                }}
            />

            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    width: '100vw',
                    height: '100%',
                    zIndex: 4,
                    pointerEvents: 'none',
                }}
            />
        </>
    );
};

export default SpotlightParticlesBadge;
