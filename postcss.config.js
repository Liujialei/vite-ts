import postcssImport from "postcss-import"
import autoprefixer from "autoprefixer"
import tailwindcss from "tailwindcss"
import tailwindConfig from "./tailwind.config.js"
export default {
  plugins: [postcssImport, autoprefixer, tailwindcss(tailwindConfig)],
};