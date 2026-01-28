import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
    return {
        plugins: [react()],
        test: {
            testTimeout: 60 * 1000,
            // Enables global 'describe', 'it', 'expect' (no need to import them)
            globals: true,
            // Emulates a browser environment
            // environment: "jsdom",
            // Path to your setup file (created in next step)
            setupFiles: ["./vitest.setup.ts"],
            // Match your project's alias configuration (usually @/ is src/)
            alias: {
                "@": __dirname,
            },
        },
    };
});
