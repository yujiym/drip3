import { nextui } from "@nextui-org/react"
import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['IBM Plex Mono', ...defaultTheme.fontFamily.sans],
        'dot': ['Silkscreen', ...defaultTheme.fontFamily.mono]
      },
    },
  },
  plugins: [nextui({
    prefix: "drp",
    themes: {
      light: {
        colors: {
          background: "#F7F7F7",
          foreground: "#111111",
        },
      },
    },
  })]
}
export default config
