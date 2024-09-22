import { IoMoon, IoSunny } from "react-icons/io5";
import { UiStore } from "../stores/uiStore";

export const ThemeChanger = () => {
    const uiStore = UiStore();

    return (
        <div className="text-2xl leading-tight aspect-square flex items-center justify-center">
            <button type="button" onClick={uiStore.toggleTheme} className="leading-0 pb-0 mb-0">
                {uiStore.theme === "dark" ? <IoSunny /> : <IoMoon />}
            </button>
        </div>
    );
};
