import React, { useEffect, useState, useRef } from "react";
import { ContributeProblemSchemaType } from "@repo/common/zod";
import { IoMdAdd } from "react-icons/io";
import { FaAngleLeft, FaChevronRight } from "react-icons/fa6";
import toast from "react-hot-toast";

type Props = {
    form: ContributeProblemSchemaType;
    currentNavIndex: number;
    setCurrentNavIndex: React.Dispatch<React.SetStateAction<number>>;
    addTestCase: () => void;
    isSample?: boolean;
};

export const TestCasesNav = ({ form, currentNavIndex, setCurrentNavIndex, addTestCase, isSample }: Props) => {
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);
    const navRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if ((isSample ? form?.sampleTestCases : form?.testCases)?.length === 0) {
            setCurrentNavIndex(0);
            addTestCase();
        }
    }, []);

    const handleScroll = () => {
        if (navRef.current) {
            const target = navRef.current;
            setIsAtStart(target.scrollLeft === 0);
            setIsAtEnd(target.scrollLeft + target.clientWidth >= target.scrollWidth);
            setIsScrollable(target.scrollWidth > target.clientWidth);
        }
    };

    useEffect(() => {
        const scrollContainer = navRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll as EventListener);
            handleScroll(); // Initial check
            return () => {
                scrollContainer.removeEventListener("scroll", handleScroll as EventListener);
            };
        }
    }, []);

    useEffect(() => {
        handleScroll();
    }, [form?.sampleTestCases, form?.testCases]);

    const testCases = isSample ? form?.sampleTestCases : form?.testCases;

    return (
        <nav className="border-b border-gray-400 dark:border-b-[#ffffff90] relative w-full max-w-[750px]">
            <ul ref={navRef} className="flex overflow-x-scroll no-scrollbar">
                {testCases?.map((_, index) => {
                    return (
                        <li
                            key={index}
                            className={`pb-2 pt-1 px-4 w-fit cursor-pointer whitespace-nowrap ${index === currentNavIndex ? "border-b border-black dark:border-white dark:text-white" : "text-gray-400 dark:text-gray-500"}`}
                            onClick={() => setCurrentNavIndex(index)}
                        >
                            Test Case {index + 1}
                        </li>
                    );
                })}

                <button
                    type="button"
                    className="text-2xl px-3 pb-1 pr-[70px]"
                    onClick={() => {
                        if (isSample && testCases?.length >= 4) {
                            toast("You can only have a maximum of 4 sample test cases.");
                            return;
                        }
                        addTestCase();
                        setCurrentNavIndex(testCases?.length);
                        setTimeout(handleScroll, 0);
                    }}
                >
                    <IoMdAdd />
                </button>
            </ul>

            {!isAtStart && (
                <button
                    type="button"
                    className="absolute left-0 py-1.5 pr-[50px] top-1/2 -translate-y-1/2 transition duration-300 bg-gradient-to-r from-white to-[#ffffff85] dark:from-dark100 dark:to-[#0307125a] text-black dark:text-white"
                    onClick={() => {
                        if (navRef.current) {
                            navRef.current.scrollLeft -= 100;
                        }
                    }}
                >
                    <FaAngleLeft />
                </button>
            )}

            {!isAtEnd && isScrollable && (
                <button
                    type="button"
                    className="absolute right-0 py-1.5 pl-[50px] top-1/2 -translate-y-1/2 transition duration-300 bg-gradient-to-l from-white to-[#ffffff85] dark:from-dark100 dark:to-[#0307125a] text-black dark:text-white"
                    onClick={() => {
                        if (navRef.current) {
                            navRef.current.scrollLeft += 100;
                        }
                    }}
                >
                    <FaChevronRight />
                </button>
            )}
        </nav>
    );
};
