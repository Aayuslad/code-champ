import { ThemeChanger } from "../themeChanger";
import { BsFire } from "react-icons/bs";

export const Header = () => {
    return (
        <div className="Header w-full flex-1 h-14 px-5 border-b-2 flex items-center bg-light200 dark:bg-dark200 border-light300 dark:border-dark300">
            <div className="font-pacifico text-2xl font-light block mr-auto">Code Champ</div>

            <div className="text-2xl mx-4 flex items-center justify-center gap-2">
                <span className="text-lg">12</span>
                <span className="text-orange-600">
                    <BsFire />
                </span>
            </div>

            <div className="mx-4">
                <ThemeChanger />
            </div>

            {/* // TODO: add logo Here

			// TODO: crete serch component with icon ( left side ) and placeholder, keep corner rounded

			// TODO: add daily stike count componet here with Rocket icon

			// TODO: add profile icon with username here

			// TODO: signin ( transparant, blue border)  and Signup ( blue ) buttons.

			// NOTE: if user has not signed up only show logo and signin Signup buttons */}
        </div>
    );
};
