import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

export const ThemeChanger = () => {
	const [dark, setDark] = useState(false);

	const darkModeHandler = () => {
		setDark(!dark);
		document.body.classList.toggle("dark");
	};

	return (
		<div className="bg-yellow-">
			<button onClick={() => darkModeHandler()}>
				{dark && <IoSunny />}
				{!dark && <IoMoon />}
			</button>
		</div>
	);
};
