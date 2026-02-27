'use client';

import { useEffect, useState, useCallback } from 'react';

const ANGLES = [30, 35, 40, 60];
const TRAIL_LENGTHS = [80, 100, 130, 170, 220, 280, 150, 110, 190, 250];
const NUM_SLOTS = 2;

function ShootingStar({ id }) {
    const [star, setStar] = useState(null);
    const [key, setKey] = useState(0);

    const generateStar = useCallback(() => {
        const angle = ANGLES[Math.floor(Math.random() * ANGLES.length)];
        const startY = -5 + Math.random() * 60;
        const duration = 1.0 + Math.random() * 0.5;
        const thickness = 2 + Math.random() * 1;
        const trailLength = TRAIL_LENGTHS[Math.floor(Math.random() * TRAIL_LENGTHS.length)];

        return { startY, angle, duration, thickness, trailLength };
    }, []);

    useEffect(() => {
        let timeout;
        const spawn = () => {
            setStar(generateStar());
            setKey(k => k + 1);
            timeout = setTimeout(spawn, 4000 + Math.random() * 4000);
        };
        timeout = setTimeout(spawn, id * 3000 + Math.random() * 2000);
        return () => clearTimeout(timeout);
    }, [id, generateStar]);

    if (!star) return null;

    return (
        <div
            style={{
                position: 'absolute',
                left: '-10%',
                top: `${star.startY}%`,
                transform: `rotate(${star.angle}deg)`,
                transformOrigin: 'left center',
                willChange: 'transform',
            }}
        >
            <div
                key={`star-${id}-${key}`}
                className="shooting-star-trail"
                style={{
                    width: `${star.trailLength}px`,
                    height: `${star.thickness}px`,
                    '--trail-length': `${star.trailLength}px`,
                    '--duration': `${star.duration}s`,
                }}
            />
        </div>
    );
}

export default function BackgroundAnimation() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]" aria-hidden="true">
            {/* Ambient blobs — using CSS animations for GPU acceleration */}
            <div
                className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full mix-blend-multiply opacity-50 bg-sky-200 blur-3xl animate-blob-1"
                style={{ willChange: 'transform' }}
            />
            <div
                className="absolute top-[40%] right-[10%] w-[500px] h-[500px] rounded-full mix-blend-multiply opacity-40 bg-blue-200 blur-3xl animate-blob-2"
                style={{ willChange: 'transform' }}
            />
            <div
                className="absolute bottom-[0%] left-[30%] w-[450px] h-[450px] rounded-full mix-blend-multiply opacity-50 bg-cyan-200 blur-3xl animate-blob-3"
                style={{ willChange: 'transform' }}
            />

            {/* Shooting stars */}
            {Array.from({ length: NUM_SLOTS }).map((_, i) => (
                <ShootingStar key={i} id={i} />
            ))}
        </div>
    );
}
