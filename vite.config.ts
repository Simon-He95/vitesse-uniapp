import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite'
import { vitePluginTailwindUni } from 'vite-plugin-tailwind-uni'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  plugins: [
    uni(),
    vitePluginTailwindUni(),
    AutoImport({
      imports: ['vue'],
      dts: true,
    })
  ],
});
