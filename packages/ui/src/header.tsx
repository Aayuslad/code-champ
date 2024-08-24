import { ThemeChanger } from "./theme-changer";

export const Header = () => {
	return (
		<div className="Header w-full h-16 px-5 border bg-white dark:bg-[#030712] border-[#E5E7EB] dark:border-green-800">
			<ThemeChanger />
		</div>
	);
};
