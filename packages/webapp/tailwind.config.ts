import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
        backgroundColor: {
            sbee: "#F4F1D4",
        },
        backgroundImage: {
            "landing-banner": "url('/img/landing-banner.svg')",
        },
        fontFamily: {
            comic: ['"Comic Neue"', "cursive"],
        },
        boxShadow: {
            connect: "0 4px 6px 0 #603309",
            post: "0 4px 6px 0 #F59F00",
        },
    },
    plugins: [],
}
export default config
