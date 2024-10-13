import { create } from "zustand";

interface UiStoreType {
	sideBarToggle: boolean;
	theme: "light" | "dark";
	toggleSideBar: () => void;
	setTheme: (theme?: "light" | "dark") => void;
	toggleTheme: () => void;
}

export const UiStore = create<UiStoreType>((set) => ({
	sideBarToggle: false,
	theme: (localStorage.getItem("theme") as "light" | "dark") || "dark",

	toggleSideBar: () => set((state) => ({ sideBarToggle: !state.sideBarToggle })),

	setTheme: (theme) => {
		if (!theme) {
			const prevTheme = localStorage.getItem("theme");
			document.body.classList.toggle(prevTheme || "dark");
		} else {
			set({ theme });
		}
	},

	toggleTheme: () =>
		set((state) => {
			const newTheme = state.theme === "light" ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			document.body.classList.toggle("dark", newTheme === "dark");
			return { theme: newTheme };
		}),
}));
