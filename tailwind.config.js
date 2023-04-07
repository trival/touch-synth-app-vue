const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],
	theme: {
		extend: {},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			neutral: colors.neutral,
			cyan: colors.cyan,
			blue: colors.blue,
			violet: colors.violet,
			fuchsia: colors.fuchsia,
			pink: colors.pink,
			red: colors.red,
			orange: colors.orange,
			amber: colors.amber,
			lime: colors.lime,
			green: colors.green,
			teal: colors.teal,

			yellow: {
				50: '#fcfee8',
				100: '#f6fdc3',
				200: '#f0fe8a',
				300: '#eaed47',
				400: '#f9d015',
				500: '#e6b908',
				600: '#c6a614',
				700: '#a16207',
				800: '#854d0e',
				900: '#713f12',
			},
		},
	},
	plugins: [],
}
