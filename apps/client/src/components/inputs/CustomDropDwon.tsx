import { useEffect, useRef, useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";

type props = {
    options: string[];
    selectedOption: string;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

function CustomDropdown({ options, selectedOption, setSelectedOption }: props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: string) => {
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
        <div className="relative inline-block w-fit" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                className="pt-1 pb-1 px-2 border-2 flex gap-1 border-light300 dark:border-dark300 w-full rounded-xl"
            >
                <span className="px-1 pb-0.5">{selectedOption}</span>
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
                            className={`px-3 pb-1 my-1 w-full text flex items-center justify-between cursor-pointer font-semibold`}
                        >
                            <span className="">{option}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomDropdown;