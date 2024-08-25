import { UiStore } from "../../stores/uiStore";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
	const uiStore = UiStore();

	return <div className={`${uiStore.sideBarToggle ? "ml-48" : "ml-16"} duration-300`}>{children}</div>;
}
