/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				light100: "#fffff", // background
				light200: "#FAFAFA", // lil darker background
				light300: "#E5E7EB", // borders
				dark100: "#030712", // background
				dark200: "#030712", // lil lighter background
				dark300: "#1F2937", // borders

				buttonBlue: "#1D4ED8", // bright blue for button
			},
		},
	},
	darkMode: "class",
	plugins: [],
};
