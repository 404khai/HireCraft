// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add these configurations to handle the 'global is not defined' error
  define: {
    // This tells Vite to replace 'global' with 'window' in the browser environment.
    // SockJS-client sometimes uses 'global' which is a Node.js concept.
    global: 'window',
  },
  optimizeDeps: {
    // Explicitly include 'sockjs-client' for pre-bundling.
    // This helps Vite handle its CommonJS module structure more effectively for the browser.
    include: ['sockjs-client'],
  },
})