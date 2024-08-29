import { useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";

interface Props {
	minWidth?: string;
	options: string[];
	selectedOption: string;
	setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

export default function CustomDropdown({ minWidth, options, selectedOption, setSelectedOption }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative inline-block">
			<button
				type="button"
				onClick={() => setIsOpen((prevState) => !prevState)}
				className={`pt-1.5 pb-1 px-3 w-fit flex items-center justify-between gap-2 dark:bg-darkDropdownn bg-lightDropdown rounded-md`}
				style={{ minWidth: minWidth }}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
			>
				<span className="leading-[1rem] pb-1">{selectedOption}</span>
				<span className={`transform transition-transform text-2xl ${isOpen ? "rotate-0" : "rotate-180"}`}>
					<RiArrowUpSLine />
				</span>
			</button>

			{isOpen && (
				<ul className="absolute z-10 top-9 w-fit dark:bg-dark300 bg-light300 rounded-md" role="listbox">
					{options.map((option) => (
						<li
							key={option}
							onClick={() => {
								setSelectedOption(option);
								setIsOpen(false);
							}}
							className="cursor-pointer rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 pt-1 pb-1.5 px-4"
							role="option"
							aria-selected={option === selectedOption}
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
