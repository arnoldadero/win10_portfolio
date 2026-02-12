import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': {},
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // Recommended to use modern-compiler for Sass
            },
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js',
    },
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'build',
    },
});
