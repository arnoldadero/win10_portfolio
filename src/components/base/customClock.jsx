import React, { useState, useEffect } from 'react';

const CustomClock = ({ format, ticking }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        if (!ticking) return;
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, [ticking]);

    const formatOptions = (fmt) => {
        switch (fmt) {
            case 'h:mm A':
                return { hour: 'numeric', minute: '2-digit', hour12: true };
            case 'DD-MM-YYYY':
                return { day: '2-digit', month: '2-digit', year: 'numeric' };
            case 'dddd,DD MMMM':
                return { weekday: 'long', day: '2-digit', month: 'long' };
            case 'HH:mm:ss':
                return { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
            case 'DD MMMM YYYY':
                return { day: '2-digit', month: 'long', year: 'numeric' };
            default:
                // Default to a sensible fallback if format is missing or unknown
                return { hour: '2-digit', minute: '2-digit', hour12: false };
        }
    };

    // If ticking is false, it's likely just a date display
    if (format === 'DD-MM-YYYY') {
        const d = time.getDate().toString().padStart(2, '0');
        const m = (time.getMonth() + 1).toString().padStart(2, '0');
        const y = time.getFullYear();
        return <span>{`${d}-${m}-${y}`}</span>;
    }

    return (
        <span>
            {new Intl.DateTimeFormat('en-US', formatOptions(format)).format(time)}
        </span>
    );
};

export default CustomClock;
