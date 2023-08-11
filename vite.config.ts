import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import copy from 'rollup-plugin-copy';


const args = process.argv.slice(2);
const i = args.findIndex(item => item === '-p')

const tailwindMap = {
  '[': '__brackets__',
  ']': '__brackets__',
  '!': '__important__',
  ':': '__colon__',
  '%':'__percent__',
  '#':'__idSelector__'
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  plugins: [
    uni(),
    wxFixPlugin() as any,
    // cssnano({
    //   preset: 'default',
    // }) as any,
    i !== -1 && copy({
      targets: [
        { src: 'static/**/*', dest: `dist/build/${args[i + 1]}/static` }
      ]
    })
  ],
});

// 兼容微信小程序不支持!、\/[^\/]*\/
function wxFixPlugin() {

  return {
    name: 'wxFixPlugin',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('.vue')) {
        return code.replace(/class="([^"]*)"/g, (_, match) => {
          const data = Object.keys(tailwindMap).reduce((result, key) => {
            const value = tailwindMap[key]
            return result.replaceAll(key, value)
          }, match)
          return `class="${data}"`
        })
      } else if (id.endsWith('styles/index.css')) {
        const result = Object.keys(tailwindMap).reduce((result, key) => {
          const value = tailwindMap[key]
          return result.replaceAll(`\\${key}`, value)
        }, code)

        return result
      }
      return code
    }

  }
}
