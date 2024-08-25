import { ThemeChanger } from "./theme-changer";

export const Header = () => {
	return (
		<div className="Header w-full flex-1 h-14 px-5 border-b-2 bg-light200 dark:bg-dark200 border-light300 dark:border-dark300">
			<ThemeChanger />

			{/* // TODO: add logo Here

			// TODO: crete serch component with icon ( left side ) and placeholder, keep corner rounded

			// TODO: add daily stike count componet here with Rocket icon

			// TODO: add profile icon with username here

			// TODO: signin ( transparant, blue border)  and Signup ( blue ) buttons.

			// NOTE: if user has not signed up only show logo and signin Signup buttons */}
		</div>
	);
};
