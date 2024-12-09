import React, { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaChevronRight } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

type TestCases =
    | {
          input: {
              value: string;
              name: string;
          }[];
          output: string;
          explanation?: string | undefined;
      }[]
    | undefined;

type Props = {
    testCases: TestCases;
    currentNavIndex: number;
    setCurrentNavIndex: React.Dispatch<React.SetStateAction<number>>;
    navIndexOfset?: number;
    addTestCase?: () => void;
};

export const TestCasesNav = ({ currentNavIndex, setCurrentNavIndex, addTestCase, testCases, navIndexOfset }: Props) => {
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);
    const navRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (testCases?.length === 0) {
            setCurrentNavIndex(0);
            addTestCase && addTestCase();
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
    }, [testCases]);

    return (
        <nav className="border-b border-gray-400 dark:border-b-[#ffffff90] relative w-full max-w-[750px]">
            <ul ref={navRef} className="flex overflow-x-scroll no-scrollbar">
                {testCases?.map((_, index) => {
                    return (
                        <li
                            key={index}
                            className={`pb-2 pt-1 px-4 w-fit cursor-pointer whitespace-nowrap ${index === currentNavIndex ? "border-b border-black dark:border-white dark:text-white" : "text-gray-400 dark:text-gray-500"}`}
                            onClick={() => {
                                console.log(index);
                                setCurrentNavIndex(index);
                            }}
                        >
                            Test Case {navIndexOfset ? index + 1 + navIndexOfset : index + 1}
                        </li>
                    );
                })}

                {addTestCase && (
                    <button
                        type="button"
                        className="text-2xl px-3 pb-1 pr-[70px]"
                        onClick={() => {
                            addTestCase();
                            setCurrentNavIndex(testCases?.length || 0);
                            setTimeout(handleScroll, 0);
                        }}
                    >
                        <IoMdAdd />
                    </button>
                )}
            </ul>

            {!isAtStart && (
                <button
                    type="button"
                    className="absolute left-0 py-1.5 pr-[50px] top-1/2 -translate-y-1/2 transition duration-300 bg-gradient-to-r from-white to-[#ffffff85] dark:from-dark100 dark:to-[#0307125a] text-inerit dark:text-white"
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
                    className="absolute right-0 py-1.5 pl-[50px] top-1/2 -translate-y-1/2 transition duration-300 bg-gradient-to-l from-white to-[#ffffff85] dark:from-dark100 dark:to-[#0307125a] text-inerit dark:text-white"
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
