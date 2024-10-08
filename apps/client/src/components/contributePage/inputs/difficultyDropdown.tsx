import { useEffect, useRef, useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";

const DifficultyLevel = ["Basic", "Easy", "Medium", "Hard"] as const;

type Props = {
    options: typeof DifficultyLevel;
    selectedOption: (typeof DifficultyLevel)[number];
    setSelectedOption: (value: (typeof DifficultyLevel)[number]) => void;
};

export const DifficultyDropdown = ({ options, selectedOption, setSelectedOption }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: (typeof DifficultyLevel)[number]) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block w-[120px]" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                className="pt-1 pb-1 px-2 border-2 flex justify-between gap-1 border-light300 dark:border-dark300 w-full rounded-lg"
            >
                <span className="px-1 pb-0.5">{selectedOption}</span>
                <span className={`transform transition-transform text-2xl ${isOpen ? "rotate-180" : "rotate-0"}`}>
                    <RiArrowUpSLine />
                </span>
            </button>

            {isOpen && (
                <ul className="absolute bottom-full mb-2 w-full dark:bg-[#030712] bg-[#f6f6f6] rounded-xl overflow-scroll no-scrollbar border-2 border-light300 dark:border-dark300 z-10" style={{ zIndex: 10 }}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`px-3 pb-1 my-1 w-full text flex items-center justify-between cursor-pointer hover:bg-light300 dark:hover:bg-dark300 transition-colors duration-200`}
                        >
                            <span className="">{option}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
