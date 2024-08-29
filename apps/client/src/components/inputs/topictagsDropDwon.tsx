import { useState } from "react";

function TopicTagsDropDwon() {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState("TopicTags");

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
				className="py-1.5 px-2 dark:bg-[#ffffff20] bg-[#00000009] w-full rounded-md"
			>
				{selected}
			</button>
			{isOpen && (
				<ul className="absolute mt-2 py-1 w-full dark:bg-[#000000] bg-[#ffffff] rounded-md">
					<li
						onClick={() => handleOptionClick("All")}
						className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2"
					>
						All
					</li>
					<li
						onClick={() => handleOptionClick("Array")}
						className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2"
					>
						Array
					</li>
					<li
						onClick={() => handleOptionClick("Sorting")}
						className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2"
					>
						Sorting
					</li>
					<li
						onClick={() => handleOptionClick("DP")}
						className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2"
					>
						DP
					</li>
					<li
						onClick={() => handleOptionClick("DP")}
						className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-2"
					>
						etc ( will be added )
					</li>
				</ul>
			)}
		</div>
	);
}

export default TopicTagsDropDwon;
