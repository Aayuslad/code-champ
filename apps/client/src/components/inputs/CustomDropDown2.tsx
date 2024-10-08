import { useState, useRef, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
interface Props {
    minWidth?: string;
    options: string[];
    selectedOption: string;
    setSelectedOption: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function CustomDropdown2({ minWidth, options, selectedOption, setSelectedOption }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const listRef = useRef<HTMLUListElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (isOpen && listRef.current) {
            const height = listRef.current.clientHeight;
            setDropdownPosition({
                top: -height,
                left: 0,
            });
        }
    }, [isOpen]);

    return (
        <div className="relative inline-block">
            <button
                type="button"
                onClick={() => setIsOpen(prevState => !prevState)}
                className={`pt-1 pb-1 px-2 mt-1 flex items-center justify-between gap-2 border-[3px] border-light300 dark:border-dark300 rounded-lg`}
                style={{ minWidth: minWidth }}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="leading-[1rem] pb-1">{selectedOption}</span>
                <span className={`transform transition-transform ${isOpen ? "rotate-0" : "rotate-180"}`}>
                    <IoIosArrowUp />
                </span>
            </button>

            {isOpen && (
                <ul
                    ref={listRef}
                    className="absolute py-1 z-10 min-w-full w-fit border-2  dark:bg-[#030712] bg-[#f6f6f6] border-light300 dark:border-dark300 rounded-md"
                    role="listbox"
                    style={{
                        top: `${dropdownPosition.top - 6}px`,
                        left: `${dropdownPosition.left}px`,
                        minWidth: minWidth,
                    }}
                >
                    {options.map(option => (
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
