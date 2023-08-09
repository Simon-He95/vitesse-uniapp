import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import cssnano from 'cssnano';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(),cssnano({
    preset: 'default',
}),],
});
