import { useState } from "react";

function DifficultyDropDwon() {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState("Difficulty");

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleOptionClick = (option: string) => {
		setSelected(option);
		setIsOpen(false);
	};

	return (
		<div className="relative inline-block w-[100px]">
			<button
				type="button"
				onClick={toggleDropdown}
				className="py-1.5 px-2 dark:bg-darkDropdownn bg-lightDropdown w-full rounded-md"
			>
				{selected}
			</button>
			{isOpen && (
				<ul className="absolute mt-2 py-1 w-full dark:bg-[#000000] bg-[#ffffff] rounded-md">
					<li
						onClick={() => handleOptionClick("Easy")}
						className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2"
					>
						Easy
					</li>
					<li
						onClick={() => handleOptionClick("Medium")}
						className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2"
					>
						Medium
					</li>
					<li
						onClick={() => handleOptionClick("Hard")}
						className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2"
					>
						Hard
					</li>
				</ul>
			)}
		</div>
	);
}

export default DifficultyDropDwon;
