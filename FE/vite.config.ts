import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: { host: true },
  plugins: [react(),
  viteStaticCopy({
    targets: [
      { src: 'node_modules/itk-wasm/dist/web-workers/*', dest: 'dist/itk/web-workers' },
      {
        src: 'node_modules/itk-image-io/*',
        dest: 'dist/itk/image-io',
      },
      {
        src: 'node_modules/itk-mesh-io/*',
        dest: 'dist/itk/mesh-io',
        rename: 'mesh-io'
      }
    ],
  })],
})
