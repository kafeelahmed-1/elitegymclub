import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import visualizer from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: any[] = [react(), mode === "development" && componentTagger()].filter(Boolean);

  // Try to load optional production-only plugins if they are installed.
  if (mode !== 'development') {
    try {
      // compression plugin (optional)
      // dynamic import keeps config resilient if the package is removed
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const compressModule = await import('vite-plugin-compression');
      const compression = compressModule?.default ?? compressModule;
      if (compression) plugins.push(compression({ algorithm: 'brotliCompress' }));

      // visualizer: statically imported above so we consistently emit `dist/stats.html`
      if (visualizer) plugins.push(visualizer({ filename: 'dist/stats.html', gzipSize: true }));
    } catch (e) {
      // Optional plugins not installed — continue without failing the config.
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins,
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('recharts')) return 'charts';
              if (id.includes('framer-motion')) return 'motion';
              if (id.includes('lucide-react')) return 'icons';
              if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
              return 'vendor';
            }
          }
        }
      },
      chunkSizeWarningLimit: 600
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
