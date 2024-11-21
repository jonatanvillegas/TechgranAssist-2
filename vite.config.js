import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  test:{
    globals:true,
    environment:"jsdom",
    setupFiles: './src/setupTests.js', 
    css: false, 
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
