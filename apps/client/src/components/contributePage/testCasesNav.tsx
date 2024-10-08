import { ContributeProblemSchemaType } from "@repo/common/zod";
import { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";

type Props = {
    form: ContributeProblemSchemaType;
    currentNavIndex: number;
    setCurrentNavIndex: React.Dispatch<React.SetStateAction<number>>;
    addTestCase: () => void;
    isSample?: boolean;
};

export const TestCasesNav = ({ form, currentNavIndex, setCurrentNavIndex, addTestCase, isSample }: Props) => {
    useEffect(() => {
        if ((isSample ? form?.sampleTestCases : form?.testCases)?.length === 0) {
            setCurrentNavIndex(0);
            addTestCase();
        }
    }, []);

    const testCases = isSample ? form?.sampleTestCases : form?.testCases;

    return (
        <nav className="border-b border-light300 dark:border-b-[#ffffff90]">
            <ul className="flex">
                {testCases?.map((_, index) => {
                    return (
                        <li
                            key={index}
                            className={`pb-2 px-3 w-fit cursor-pointer ${index === currentNavIndex ? "border-b border-white" : ""}`}
                            onClick={() => setCurrentNavIndex(index)}
                        >
                            Test Case {index + 1}
                        </li>
                    );
                })}

                <button
                    type="button"
                    className="text-2xl px-3 pb-3"
                    onClick={() => {
                        addTestCase();
                        setCurrentNavIndex(testCases?.length);
                    }}
                >
                    <IoMdAdd />
                </button>
            </ul>
        </nav>
    );
};