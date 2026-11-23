import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readdirSync } from 'node:fs';
const pages = Object.fromEntries(readdirSync('.').filter(f => f.endsWith('.html')).map(f => [f.replace('.html',''), resolve(process.cwd(),f)]));
export default defineConfig({ base: '/', build: { rollupOptions: { input: pages } } });
