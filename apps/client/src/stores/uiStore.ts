import { create } from "zustand";

interface UiStoreType {
	sideBarToggle: boolean;
	toggleSideBar: () => void;
}

export const UiStore = create<UiStoreType>((set) => ({
	sideBarToggle: false,

	toggleSideBar: () => set((state) => ({ sideBarToggle: !state.sideBarToggle })),
}));
