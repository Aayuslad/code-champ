import { useState, useEffect, useRef } from "react";
import { RiArrowUpSLine } from "react-icons/ri";

type props = {
    options: string[];
    selectedOptions: string[];
    setSelectedOptions: (newOptions: string[]) => void;
};

function TopicTagsDropDwon({ options, selectedOptions, setSelectedOptions }: props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: string) => {
        setSelectedOptions(
            (() => {
                if (selectedOptions.includes(option)) {
                    return selectedOptions.filter(opt => opt !== option);
                } else {
                    return [...selectedOptions, option];
                }
            })(),
        );
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
                <span className="px-1 pb-0.5">
                    Topics{" "}
                    {selectedOptions.length > 0 && (
                        <span className="bg-gray-300 dark:bg-dark300 ml-1 px-1.5 pb-[2px] pt-[1px] text-xs rounded-2xl">
                            {selectedOptions.length}
                        </span>
                    )}
                </span>
                <span className={`transform transition-transform text-2xl ${isOpen ? "rotate-0" : "rotate-180"}`}>
                    <RiArrowUpSLine />
                </span>
            </button>
            {isOpen && (
                <ul className="absolute mt-2 p-2 w-[310px] h-[400px] backdrop-blur-[40px] dark:bg-[#030712] bg-[#f6f6f6] rounded-2xl overflow-scroll no-scrollbar border-2 border-light300 dark:border-dark300 z-10" style={{ zIndex: 10 }}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`inline-block border px-2.5 pb-1 rounded-2xl mx-1 my-1 text-sm cursor-pointer border-gray-400 dark:border-gray-600 ${
                                selectedOptions.includes(option) ? "bg-zinc-300 dark:bg-darkTableRow1" : ""
                            }`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TopicTagsDropDwon;