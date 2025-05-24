import express from 'express';
import cors from 'cors';

export const handleEnvTypeRun = () => {
    if (process.env.NODE_ENV === 'production') return express.static('public');

    const corsOptions = {
        origin: ['http://127.0.0.1.5173', 'http://localhost:5173'],
        credential: true
    }

    return cors(corsOptions);
}
