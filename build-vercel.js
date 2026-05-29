import fs from 'fs';
import path from 'path';

// Clean existing .vercel/output
fs.rmSync('.vercel/output', { recursive: true, force: true });
fs.mkdirSync('.vercel/output/functions', { recursive: true });

// Move config
fs.copyFileSync('dist/config.json', '.vercel/output/config.json');

// Move static assets
fs.renameSync('dist/client', '.vercel/output/static');

// Move server function
fs.renameSync('dist/server', '.vercel/output/functions/__server.func');

console.log('Successfully prepared .vercel/output for Vercel Build Output API v3');
