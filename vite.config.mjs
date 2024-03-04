import path, { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
    ],
    resolve: {
        alias: {
            '@app': join(__dirname, 'src/app'),
            '@lib': join(__dirname, 'src/lib'),
        },
    },
    build: {
        target: 'modules',
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: [resolve(__dirname, 'src/index.ts')],
            name: 'creatif',
            // the proper extensions will be added
            fileName: 'index',
        },
        outDir: 'build',
    },
});
