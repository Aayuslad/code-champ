import { IoMoon, IoSunny } from "react-icons/io5";
import { UiStore } from "../stores/uiStore";

export const ThemeChanger = () => {
	const uiStore = UiStore();

	return (
		<div className="text-2xl px-2">
			<button onClick={uiStore.toggleTheme}>{uiStore.theme === "dark" ? <IoSunny /> : <IoMoon />}</button>
		</div>
	);
};
