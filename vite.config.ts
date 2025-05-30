import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // SEO and Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries for better caching
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['react-icons'],
        },
      },
    },
    // Optimize chunk sizes
    chunkSizeWarningLimit: 1000,
    // Use esbuild for faster minification (default)
    minify: 'esbuild',
    // Source maps for debugging (optional in production)
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'react-icons'],
  },
  // Define environment variables for SEO
  define: {
    __SITE_URL__: JSON.stringify('https://hakangok.dev'),
    __SITE_NAME__: JSON.stringify('Hakan Gök Portfolio'),
  },
  // ESBuild optimization for production
  esbuild: {
    drop: ['console', 'debugger'], // Remove console.logs and debugger statements
  },
})
