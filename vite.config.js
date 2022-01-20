import legacy from '@vitejs/plugin-legacy';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const pagesPath = resolve(__dirname, "pages");
/** @type {{ [key: string]: string }} */
const pages = {};
readdirSync(pagesPath).forEach((file) => {
  if (file.match(/\.html$/)) {
    pages[file] = resolve(pagesPath, file);
  }
});

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    plugins: [legacy()],
    build: {
      minify: isProduction,
      rollupOptions: {
        input: {
          index: resolve(__dirname, "index.html"),
          ...pages,
        },
      },
    },
  };
});
