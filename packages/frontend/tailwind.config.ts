import { nextui } from "@nextui-org/react"
import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        'dot': ['var(--font-matrix-sans)', ...defaultTheme.fontFamily.mono]
      },
    },
  },
  plugins: [nextui({
    prefix: "drp",
    themes: {
      light: {
        colors: {
          white: "#f7f7f7",
          background: "#e6dfd7",
          foreground: {
            500: "#999999",
            DEFAULT: "#111111"
          },
          primary: "#111111",
        },
      },
    },
  })]
}
export default config
