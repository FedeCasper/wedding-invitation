import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sweetalert2',
      configureServer(server) {
        server.middlewares.use(sweetalert2);
      },
    },
  ],
});
