import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import copy from 'rollup-plugin-copy';
import AutoImport from 'unplugin-auto-import/vite'
import { vitePluginTailwindUni } from 'vite-plugin-tailwind-uni'

const args = process.argv.slice(2);
const i = args.findIndex(item => item === '-p')

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
    }),
    i !== -1 && copy({
      targets: [
        { src: 'static/**/*', dest: `dist/build/${args[i + 1]}/static` }
      ]
    })
  ],
});
