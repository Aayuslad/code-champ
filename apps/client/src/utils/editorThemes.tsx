import { editor } from "monaco-editor";

export const defineEditorThemes = () => {
	// Define the dark theme based on vs-dark
	editor.defineTheme("custom-dark", {
		base: "vs-dark",
		inherit: true,
		rules: [],
		colors: {
			"editor.background": "#030712",
		},
	});

	// Define the light theme based on hc-light
	editor.defineTheme("custom-light", {
		base: "hc-light",
		inherit: true,
		rules: [],
		colors: {
			"editor.background": "#ffffff",
		},
	});
};

// TODO: these themes are not working, make them work