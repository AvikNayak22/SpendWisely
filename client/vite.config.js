import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), viteCompression()],
  server: {
    proxy: {
      "/api/v1": {
        // target: "http://localhost:8080",  for running locally
        target: "https://spendwisely-i35h.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
