/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                light100: "#fffff", // background
                light200: "#FAFAFA", // lil darker background
                light300: "#E5E7EB", // borders
                light400: "#bebebe",
                dark100: "#030712", // background
                dark200: "#030712", // lil lighter background
                dark300: "#1F2937", // borders

                buttonBlue: "#1D4ED8", // bright blue for button
                lightDropdown: "#00000009",
                darkDropdownn: "#ffffff20",

                lightTableRow1: "rgba(193, 195, 199, 0.5)", // lighter background for table rows with transparency
                lightTableRow2: "rgba(198, 200, 203, 0.5)", // lighter background for table rows with transparency
                lightTableRow3: "rgba(210, 210, 210, 0.5)", // lighter background for table rows with transparency
                darkTableRow1: "rgba(55, 65, 81, 0.5)", // darker background for table rows with transparency
                darkTableRow2: "rgba(45, 55, 72, 0.5)", // darker background for table rows with transparency
                darkTableRow3: "rgba(38, 50, 56, 0.5)", // darker background for table rows with transparency            \
            },
            boxShadow: {},
            textColor: {
                lightText900: "#000000",
                lightText800: "#00000090",
                darkText900: "#FFFFFF",
                darkText800: "#FFFFFF90",
            },
            fontFamily: {
                pacifico: ["Pacifico", "cursive"],
            },
        },
    },
    darkMode: "class",
    plugins: [],
};
