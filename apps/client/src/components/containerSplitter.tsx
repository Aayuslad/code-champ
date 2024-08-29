import { UiStore } from "../stores/uiStore";
import { PiLineVerticalLight } from "react-icons/pi";

interface props {
	setLeftWidth: React.Dispatch<React.SetStateAction<number>>;
}

export function ContainerSplitter({ setLeftWidth }: props) {
	const uiStore = UiStore();

	const sidebarWidth = uiStore.sideBarToggle ? 192 : 64; // nabar widths

	// vertical splitter logic
	const handleMouseMove = (e: any) => {
		const availableWidth = window.innerWidth - sidebarWidth;
		const newLeftWidth = ((e.clientX - sidebarWidth) / availableWidth) * 100;
		if (newLeftWidth > 35 && newLeftWidth < 65) {
			setLeftWidth(newLeftWidth);
		}
	};
	const handleMouseUp = () => {
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};
	const handleMouseDown = () => {
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	return (
		<div className="Splitter cursor-col-resize w-1 bg-light300 dark:bg-dark300 relative" onMouseDown={handleMouseDown}>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl text-lightText800 dark:text-darkText800">
				<PiLineVerticalLight />
			</div>
		</div>
	);
}
