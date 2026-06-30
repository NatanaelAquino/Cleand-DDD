import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';
import dotenv from 'dotenv';

dotenv.config(); 

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    setupFiles: ['./test/setup-e2e.ts'],
    globals: true,
    root: './',
    hookTimeout: 600000,
    testTimeout: 600000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    swc.vite({
      module: {
        type: 'es6',
      }
    })
  ],
});