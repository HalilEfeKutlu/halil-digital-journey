"use client";
import { useEffect, useState } from "react";
export function StarField({ visible }) {
    // Generate stars only on the client after mount to avoid hydration mismatch.
    const [stars, setStars] = useState([]);
    useEffect(() => {
        setStars(Array.from({ length: 70 }, () => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 3,
            duration: Math.random() * 2 + 2,
        })));
    }, []);
    return (<div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease",
        }}>
      {stars.map((s, i) => (<span key={i} className="animate-twinkle absolute block rounded-full bg-white" style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
                boxShadow: "0 0 6px rgba(255,255,255,0.8)",
            }}/>))}
    </div>);
}
