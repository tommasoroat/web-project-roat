'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

const ANGLES = [30, 35, 40, 60];
const TRAIL_LENGTHS = [80, 100, 130, 170, 220, 280, 150, 110, 190, 250];
const NUM_SLOTS = 2; // 2 slots so max 1-2 stars at a time

function ShootingStar({ id }) {
    const [star, setStar] = useState(null);
    const [key, setKey] = useState(0);

    const generateStar = useCallback(() => {
        const angle = ANGLES[Math.floor(Math.random() * ANGLES.length)];
        // Start position: left edge, random Y in upper portion
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
            // 4-8 seconds between each star
            timeout = setTimeout(spawn, 4000 + Math.random() * 4000);
        };
        // Stagger: second slot starts 3-5s after first
        timeout = setTimeout(spawn, id * 3000 + Math.random() * 2000);
        return () => clearTimeout(timeout);
    }, [id, generateStar]);

    if (!star) return null;

    // The whole container is rotated at the angle so the trail follows the diagonal.
    // We only animate along one axis (translateX) and the rotation makes it diagonal.
    return (
        <div
            style={{
                position: 'absolute',
                left: '-10%',
                top: `${star.startY}%`,
                transform: `rotate(${star.angle}deg)`,
                transformOrigin: 'left center',
            }}
        >
            <motion.div
                key={`star-${id}-${key}`}
                style={{
                    width: `${star.trailLength}px`,
                    height: `${star.thickness}px`,
                    background: `linear-gradient(to right, 
                        transparent 0%, 
                        rgba(186, 230, 253, 0.12) 15%, 
                        rgba(147, 197, 253, 0.3) 35%, 
                        rgba(96, 165, 250, 0.6) 60%, 
                        rgba(59, 130, 246, 0.8) 80%, 
                        rgba(37, 99, 235, 0.95) 97%, 
                        rgba(253, 224, 71, 1) 100%)`,
                    borderRadius: '999px',
                    filter: 'blur(0.2px)',
                    boxShadow: `
                        ${star.trailLength}px 0 3px rgba(253, 224, 71, 0.9),
                        ${star.trailLength}px 0 8px rgba(253, 224, 71, 0.3),
                        0 0 4px rgba(59, 130, 246, 0.3)
                    `,
                }}
                initial={{
                    opacity: 0,
                    x: 0,
                }}
                animate={{
                    opacity: [0, 1, 1, 0.6, 0],
                    x: '200vw',
                }}
                transition={{
                    duration: star.duration,
                    ease: 'linear',
                    times: [0, 0.03, 0.5, 0.85, 1],
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
            {/* Ambient blobs */}
            <motion.div
                className="absolute top-[10%] left-[10%] w-[400px] h-[400px] rounded-full mix-blend-multiply opacity-50 bg-sky-200 blur-3xl"
                animate={{
                    x: [0, 150, 0, -150, 0],
                    y: [0, 100, 200, 100, 0],
                    scale: [1, 1.2, 1, 0.8, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute top-[40%] right-[10%] w-[500px] h-[500px] rounded-full mix-blend-multiply opacity-40 bg-blue-200 blur-3xl"
                animate={{
                    x: [0, -200, 0, 200, 0],
                    y: [0, 150, -50, 150, 0],
                    scale: [1, 0.8, 1.2, 0.9, 1],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute bottom-[0%] left-[30%] w-[450px] h-[450px] rounded-full mix-blend-multiply opacity-50 bg-cyan-200 blur-3xl"
                animate={{
                    x: [0, 200, -100, 100, 0],
                    y: [0, -200, 0, 100, 0],
                    scale: [1, 1.1, 0.9, 1.1, 1],
                }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            />

            {/* Multiple shooting star slots — each spawns independently with random timing */}
            {Array.from({ length: NUM_SLOTS }).map((_, i) => (
                <ShootingStar key={i} id={i} />
            ))}
        </div>
    );
}
