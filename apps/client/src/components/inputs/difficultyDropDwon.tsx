import { useState, useEffect, useRef } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
import { GiCheckMark } from "react-icons/gi";

type props = {
    options: string[];
    selectedOptions: string[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

function DifficultyDropdown({ options, selectedOptions, setSelectedOptions }: props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: string) => {
        setSelectedOptions(prevOptions => {
            if (prevOptions.includes(option)) {
                return prevOptions.filter(opt => opt !== option);
            } else {
                const newOptions = [...prevOptions, option];
                if (newOptions.length === 4) {
                    return [];
                }
                return newOptions;
            }
        });
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
        <div className="relative inline-block w-fit" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                className="pt-1 pb-1 px-2 border-2 flex gap-1 border-light300 dark:border-dark300 w-full rounded-xl"
            >
                <span className="px-1 pb-0.5">Difficulty</span>
                <span className={`transform transition-transform text-2xl ${isOpen ? "rotate-0" : "rotate-180"}`}>
                    <RiArrowUpSLine />
                </span>
            </button>
            {isOpen && (
                <ul className="absolute mt-2 w-full dark:bg-[#030712] bg-[#f6f6f6] rounded-xl overflow-scroll no-scrollbar border-2 border-light300 dark:border-dark300 z-10" style={{ zIndex: 10 }}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`px-3 pb-1 my-1 w-full text flex items-center justify-between cursor-pointer font-semibold border-gray-400 dark:border-gray-600 ${option === "Basic" ? "text-green-500" : option === "Easy" ? "text-emerald-500" : option === "Medium" ? "text-yellow-500" : "text-red-500"}`}
                        >
                            <span className="">{option}</span>
                            {selectedOptions.includes(option) && (
                                <span className="text-black dark:text-white text-xs">
                                    <GiCheckMark />
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DifficultyDropdown;