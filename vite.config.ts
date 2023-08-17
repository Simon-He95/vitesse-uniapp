import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import AutoImport from 'unplugin-auto-import/vite'
import { vitePluginTailwindUni } from 'vite-plugin-tailwind-uni'
import fs from 'fs'

const args = process.argv.slice(2);
const i = args.findIndex(item => item === '-p')
const filename = i === -1 ? 'h5' : args[i + 1]
console.log({ filename })
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
    {
      enforce: 'post',
      buildEnd() {
        const files = fs.readdirSync("static", 'utf-8')
        setTimeout(async () => {
          const desc = `dist/build/${filename}/static`
          if (!fs.existsSync(desc)) {
            await fs.mkdirSync(desc)
          }
          files.forEach((file: string) => {
            fs.copyFileSync(`static/${file}`, `${desc}/${file}`);
          })
        },10)

      }
    }

  ],
});


