import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { wasm } from '@rollup/plugin-wasm';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import inject from '@rollup/plugin-inject';
import { svgLoader } from './viteSvgLoader';
import { VitePWA } from 'vite-plugin-pwa'

const copyFiles = {
  targets: [
    {
      src: 'node_modules/@matrix-org/olm/olm.wasm',
      dest: '',
    },
    {
      src: 'node_modules/pdfjs-dist/build/pdf.worker.min.js',
      dest: '',
    },
    {
      src: '_redirects',
      dest: '',
    },
    {
      src: 'config.json',
      dest: '',
    },
    {
      src: 'public/manifest.json',
      dest: '',
    },
    {
      src: 'public/res/android',
      dest: 'public/',
    },
  ],
}

export default defineConfig({
  appType: 'spa',
  publicDir: false,
  base: "",
  server: {
    port: 8080,
    host: true,
  },
  plugins: [
    VitePWA({
      // add this to cache all the imports
      strategies: 'injectManifest',
      injectManifest: {
        minify: true,
        maximumFileSizeToCacheInBytes: 10000000,
        globPatterns: ['**/*'],
      },
      devOptions: {
        enabled: true,
        type: 'classic'
      },
      manifest: {
        theme_color: '#000000',
        display: "standalone",
        gcm_sender_id: "103953800507",
        shortname: "meow",
        name: "meow meow meow",
        start_url: "./",
        icons: [
          {
            src: 'pwa-192x192.png', // <== don't add slash, for testing
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png', // <== don't remove slash, for testing
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png', // <== don't add slash, for testing
            sizes: '512x512',
            type: 'image/png',
            purpose: ['any', 'maskable'], // testing new type declaration
          },
        ],
      },
      injectRegister: null,
      filename: "firebase-sw.js",
      registerType: 'autoUpdate',
      srcDir: 'src',
    }),
    viteStaticCopy(copyFiles),
    vanillaExtractPlugin(),
    svgLoader(),
    wasm(),
    react(),
  ],
  optimizeDeps: {
    esbuildOptions: {
        define: {
          global: 'globalThis'
        },
        plugins: [
          // Enable esbuild polyfill plugins
          NodeGlobalsPolyfillPlugin({
            process: false,
            buffer: true,
          }),
        ]
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    copyPublicDir: false,
    rollupOptions: {
      plugins: [
        inject({ Buffer: ['buffer', 'Buffer'] })
      ]
    }
  },
});
