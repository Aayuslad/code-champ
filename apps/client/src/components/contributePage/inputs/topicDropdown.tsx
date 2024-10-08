import { useEffect, useRef, useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
import { TOIPC_TAGS } from "../../../config/toipcTags";
import toast from "react-hot-toast";

type TopicTagsDropDwonProps = {
    options: typeof TOIPC_TAGS;
    selectedOptions: string[];
    setSelectedOptions: (value: typeof TOIPC_TAGS) => void;
};

export function TopicDropDwon({ options, selectedOptions, setSelectedOptions }: TopicTagsDropDwonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            if (selectedOptions.length === 4) {
                toast("You can only select up to 4 tags.");
                return;
            }
            setSelectedOptions([...selectedOptions, option]);
        }
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
            <div className="relative">
                {isOpen && (
                    <ul className="absolute bottom-full mb-2 p-2 w-[400px] h-[260px] backdrop-blur-[40px] dark:bg-[#030712] bg-[#f6f6f6] rounded-lg overflow-scroll no-scrollbar border-2 border-light300 dark:border-dark300 z-10" style={{ zIndex: 10 }}>
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

                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="pt-1 pb-1 px-2 border-2 flex gap-1 border-light300 dark:border-dark300 w-full rounded-lg"
                >
                    <span className="px-1 pb-0.5">
                        Topics{" "}
                        {selectedOptions.length > 0 && (
                            <span className="bg-gray-300 dark:bg-dark300 ml-1 px-1.5 pb-[2px] pt-[1px] text-xs rounded-2xl">
                                {selectedOptions.length}
                            </span>
                        )}
                    </span>
                    <span className={`transform transition-transform text-2xl ${isOpen ? "rotate-180" : "rotate-0"}`}>
                        <RiArrowUpSLine />
                    </span>
                </button>
            </div>
        </div>
    );
}