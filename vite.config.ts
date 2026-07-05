/// <reference types="vitest/config" />
// https://vite.dev/config/
import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// const dirname =
//     typeof __dirname !== 'undefined'
//         ? __dirname
//         : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@public': path.resolve(__dirname, './public'),
        },
    },
});
