import { HiBars3 } from "react-icons/hi2";
import { UiStore } from "../../stores/uiStore";
import { RxCross2 } from "react-icons/rx";

export default function NavToggleButton() {
	const uiStore = UiStore();

	return (
		<button
			className="text-3xl text-inerit dark:text-white w-full h-full pr-1 flex items-center justify-end"
			onClick={() => uiStore.toggleSideBar()}
		>
			<span className={` inset-0 transition-opacity duration-300 ${!uiStore.sideBarToggle ? "opacity-100" : "opacity-0 hidden"}`}>
				<HiBars3 />
			</span>
			<span className={` inset-0 transition-opacity duration-300 ${uiStore.sideBarToggle ? "opacity-100" : "opacity-0 hidden"}`}>
				<RxCross2 />
			</span>
		</button>
	);
}
