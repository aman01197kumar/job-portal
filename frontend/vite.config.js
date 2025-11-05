import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["@mui/material", "@mui/icons-material"],
  },
  build: {
    chunkSizeWarningLimit: 1500, // Set the limit to 1500 KiB (1.5 MB)
  },
});
