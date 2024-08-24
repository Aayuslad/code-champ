import { ThemeChanger } from "./theme-changer";

export const Header = () => {
	return (
		<div className="Header w-full flex-1 h-16 px-5 border bg-[#FAFAFA] dark:bg-[#030712] border-[#E5E7EB] dark:border-[#1F2937]">
			<ThemeChanger />
		</div>
	);
};
