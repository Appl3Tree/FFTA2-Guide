import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
    plugins: [react()],
    base: "/FFTA2-Guide/",
    build: {
        outDir: "dist"
    }
});

