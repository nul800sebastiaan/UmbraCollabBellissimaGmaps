import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: "src/gmaps-editor.ts", // your web component source file
            formats: ["es"],
            fileName: "Our.Umbraco.Gmaps"
        },
        emptyOutDir: true,
        outDir: "../../wwwroot/App_Plugins/Gmaps", // your web component will be saved in this location
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/],
        },

    },
});
