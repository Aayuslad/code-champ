import { useState } from "react";
import { TestCasesNav } from "../testCasesNav";
import { ContributeProblemSchemaType } from "@repo/common/zod";

type Props = {
    form: ContributeProblemSchemaType;
    setForm: React.Dispatch<React.SetStateAction<ContributeProblemSchemaType>>;
};

export const TestCaseInput = ({ form, setForm }: Props) => {
    const [currentNavIndex, setCurrentNavIndex] = useState(0);
    const [currentSampleNavIndex, setCurrentSampleNavIndex] = useState(0);
    const currentTestCase = form.testCases[currentNavIndex];
    const currentSampleTestCase = form.sampleTestCases[currentSampleNavIndex];

    const handleInputChange = (isTestCase: boolean, index: number, value: string) => {
        setForm(prev => ({
            ...prev,
            [isTestCase ? "testCases" : "sampleTestCases"]: prev[isTestCase ? "testCases" : "sampleTestCases"].map(
                (testCase, i) =>
                    i === (isTestCase ? currentNavIndex : currentSampleNavIndex)
                        ? {
                              ...testCase,
                              input: testCase.input.map((input, j) => (j === index ? { ...input, value } : input)),
                          }
                        : testCase,
            ),
        }));
    };

    const handleOutputChange = (isTestCase: boolean, value: string) => {
        setForm(prev => ({
            ...prev,
            [isTestCase ? "testCases" : "sampleTestCases"]: prev[isTestCase ? "testCases" : "sampleTestCases"].map(
                (testCase, i) =>
                    i === (isTestCase ? currentNavIndex : currentSampleNavIndex) ? { ...testCase, output: value } : testCase,
            ),
        }));
    };

    const addTestCase = (isSample: boolean) => {
        setForm(prev => {
            const testCaseType = isSample ? "sampleTestCases" : "testCases";
            return {
                ...prev,
                [testCaseType]: [
                    ...prev[testCaseType],
                    {
                        input: form.functionStructure.parameters.map(param => ({
                            name: param.name,
                            value: "",
                        })),
                        output: "",
                        explanation: "",
                    },
                ],
            };
        });
    };

    const renderInputFields = (testCase: typeof currentTestCase | typeof currentSampleTestCase, isTestCase: boolean) => (
        <>
            {testCase?.input.map((input, index) => (
                <div key={index} className="flex flex-col gap-2 mb-2">
                    <label htmlFor={`${isTestCase ? "" : "sample-"}input-${index}`} className="font-semibold text-darkText900">
                        {input.name} {"( "}
                        {form.functionStructure.parameters[index].category === "base" &&
                            form.functionStructure.parameters[index].baseType}
                        {form.functionStructure.parameters[index].category !== "base" &&
                            form.functionStructure.parameters[index].derivedType}
                        {" )"}
                    </label>
                    {form.functionStructure.parameters[index].category === "base" ? (
                        <input
                            type="text"
                            id={`${isTestCase ? "" : "sample-"}input-${index}`}
                            value={input.value}
                            onChange={e => handleInputChange(isTestCase, index, e.target.value)}
                            className="w-[400px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                        />
                    ) : (
                        <div className="relative">
                            <textarea
                                id={`${isTestCase ? "" : "sample-"}input-${index}`}
                                value={input.value}
                                placeholder="Instructions: Add elements of derived data type (e.g., array, linked list, queue) by separating them with commas. Example: 3,2,6,5,4,3"
                                onChange={e => handleInputChange(isTestCase, index, e.target.value)}
                                className="h-[100px] w-full bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none resize-none"
                            />
                            <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                                Elements: {input.value.split(",").length}
                            </span>
                        </div>
                    )}
                </div>
            ))}
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-darkText900">
                    Output {"( "}
                    {form.functionStructure.returnType.category === "base" && form.functionStructure.returnType.baseType}
                    {form.functionStructure.returnType.category !== "base" && form.functionStructure.returnType.derivedType}
                    {" )"}
                </label>
                {form.functionStructure.returnType.category === "base" ? (
                    <input
                        type="text"
                        id={`${isTestCase ? "" : "sample-"}output`}
                        value={testCase?.output}
                        onChange={e => handleOutputChange(isTestCase, e.target.value)}
                        className="w-[400px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                    />
                ) : (
                    <div className="relative">
                        <textarea
                            id={`${isTestCase ? "" : "sample-"}output`}
                            value={testCase?.output}
                            onChange={e => handleOutputChange(isTestCase, e.target.value)}
                            className="w-[400px] h-[400px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none resize-none"
                        />
                        <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                            Elements: {testCase?.output.split(",").length}
                        </span>
                    </div>
                )}
            </div>
        </>
    );

    return (
        <>
            <div className="basis-[65%] py-6 px-10">
                <div className="mb-20">
                    <div className="font-semibold text-lg pb-6 flex justify-between items-center">
                        <span>Sample Test Cases / Examples *</span>
                        <span className="font-normal">{form.sampleTestCases?.length}</span>
                    </div>

                    <TestCasesNav
                        isSample={true}
                        form={form}
                        currentNavIndex={currentSampleNavIndex}
                        setCurrentNavIndex={setCurrentSampleNavIndex}
                        addTestCase={() => addTestCase(true)}
                    />

                    <div className="flex flex-col gap-2 py-4">{renderInputFields(currentSampleTestCase, false)}</div>
                </div>

                <div className="">
                    <div className="font-semibold text-lg pb-6 flex justify-between items-center">
                        <span>Test Cases *</span>
                        <span className="font-normal">{form.testCases?.length}</span>
                    </div>

                    <TestCasesNav
                        form={form}
                        currentNavIndex={currentNavIndex}
                        setCurrentNavIndex={setCurrentNavIndex}
                        addTestCase={() => addTestCase(false)}
                    />

                    <div className="flex flex-col gap-2 py-4">{renderInputFields(currentTestCase, true)}</div>
                </div>
            </div>

            <div className=" basis-[35%] p-8 pl-2 text-lightText800 dark:text-darkText800">
                <div className="p-4">
                    <h3 className="font-semibold mb-2">Test Case Guidelines:</h3>
                    <ul className="list-disc pl-4 space-y-2 text-justify">
                        <li>
                            <b>Comprehensive</b> Coverage: Include basic, edge, and special cases
                        </li>
                        <li>
                            <b>Uniqueness</b>: Ensure each test case assesses different aspects
                        </li>
                        <li>
                            <b>Accuracy</b>: Provide correct and precise expected outputs
                        </li>
                        <li>
                            <b>Efficiency</b>: Evaluate performance with large inputs
                        </li>
                        <li>
                            <b>Input Variety</b>: Use diverse inputs, including boundary values
                        </li>
                        <li>
                            <b>Automated Generation</b>: Consider using scripts for large/random cases
                        </li>
                        <li>
                            <b>Respect Constraints</b>: Comply with defined problem constraints
                        </li>
                        <li>
                            <b>Avoid Ambiguity</b>: Ensure clear and unambiguous expected outputs
                        </li>
                    </ul>

                    <p className="mt-6">
                        "Your problem will be available on the platform after approval by the admin. We will contact you if
                        needed, and you can reach out to us anytime to check the status of your submission."
                    </p>
                </div>
                <button type="submit" className="py-2 px-4 rounded-xl font-semibold mt-2 ml-6 text-black dark:text-white bg-light400 dark:bg-dark300 ">
                    Submit
                </button>
            </div>
        </>
    );
};
