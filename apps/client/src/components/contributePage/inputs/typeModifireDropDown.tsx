import { useEffect, useRef, useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
import { typeModifier } from "../../../pages/Contribute";

type props = {
    options: typeof typeModifier;
    selectedOption: (typeof typeModifier)[number];
    setSelectedOption: (value: (typeof typeModifier)[number]) => void;
};

function TypeModifierDropDown({ options, selectedOption, setSelectedOption }: props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: (typeof typeModifier)[number]) => {
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
                className="pt-1 pb-1 px-2 border-2 flex justify-between gap-1 border-light300 dark:border-dark300 w-[180px] rounded-lg"
            >
                <span className="px-1 pb-0.5">{selectedOption === undefined ? "no type modifier" : selectedOption}</span>
                <span className={`transform transition-transform text-2xl ${isOpen ? "rotate-0" : "rotate-180"}`}>
                    <RiArrowUpSLine />
                </span>
            </button>

            {isOpen && (
                <ul
                    className="absolute mt-2 w-full dark:bg-[#030712] bg-[#f6f6f6] rounded-lg overflow-scroll no-scrollbar border-2 border-light300 dark:border-dark300 z-10"
                    style={{ zIndex: 10 }}
                >
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className={`px-3 pb-1 my-1 w-full text flex items-center justify-between cursor-pointer hover:bg-light300 dark:hover:bg-dark300`}
                        >
                            <span className="">{option}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TypeModifierDropDown;
