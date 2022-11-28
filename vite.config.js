const { resolve } = require('path');
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve('public'),
  preview: {
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        homePage: resolve(__dirname, 'src/index.html'),
        profilePage: resolve(__dirname, 'src/profile.html'),
        detailPage: resolve(__dirname, 'src/details.html'),
        favoritePage: resolve(__dirname, 'src/favorites.html'),
        auctioningPage: resolve(__dirname, 'src/auctioning.html'),
        loginPage: resolve(__dirname, 'src/auctioning.html'),
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },

  resolve: {
    alias: {},
  },
  server: {
    port: 8080,
    hot: true,
  },
});
