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

    return (
        <>
            <div className="basis-[70%] py-6 px-10">
                <div className="mb-20">
                    <div className="font-semibold text-lg pb-6">Sample Test Cases ( examples )</div>

                    <TestCasesNav
                        isSample={true}
                        form={form}
                        currentNavIndex={currentSampleNavIndex}
                        setCurrentNavIndex={setCurrentSampleNavIndex}
                        addTestCase={() => {
                            setForm(prev => ({
                                ...prev,
                                sampleTestCases: [
                                    ...prev.sampleTestCases,
                                    {
                                        input: [
                                            ...form.functionStructure.parameters.map(param => ({ name: param.name, value: "" })),
                                        ],
                                        output: "",
                                        explanation: "",
                                    },
                                ],
                            }));
                        }}
                    />

                    <div className="flex flex-col gap-2 py-4">
                        {currentSampleTestCase?.input.map((input, index) => {
                            return (
                                <div key={index} className="flex flex-col gap-2">
                                    <label htmlFor={`sample-input-${index}`} className="font-semibold text-darkText900">
                                        {input.name}
                                    </label>
                                    <input
                                        type="text"
                                        name=""
                                        id={`sample-input-${index}`}
                                        value={input.value}
                                        onChange={e => {
                                            setForm(prev => ({
                                                ...prev,
                                                sampleTestCases: prev.sampleTestCases.map((testCase, i) => {
                                                    if (i === currentSampleNavIndex) {
                                                        return {
                                                            ...testCase,
                                                            input: testCase.input.map((input, j) => {
                                                                if (j === index) {
                                                                    return {
                                                                        ...input,
                                                                        value: e.target.value,
                                                                    };
                                                                }
                                                                return input;
                                                            }),
                                                        };
                                                    }
                                                    return testCase;
                                                }),
                                            }));
                                        }}
                                        className="w-[900px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                                    />
                                </div>
                            );
                        })}

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-darkText900">Output</label>
                            <input
                                type="text"
                                id={`sample-output`}
                                value={currentSampleTestCase?.output}
                                onChange={e => {
                                    setForm(prev => ({
                                        ...prev,
                                        sampleTestCases: prev.sampleTestCases.map((testCase, i) => {
                                            if (i === currentSampleNavIndex) {
                                                return {
                                                    ...testCase,
                                                    output: e.target.value,
                                                };
                                            }
                                            return testCase;
                                        }),
                                    }));
                                }}
                                className="w-[900px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="font-semibold text-lg pb-6">Test Cases</div>

                    <TestCasesNav
                        form={form}
                        currentNavIndex={currentNavIndex}
                        setCurrentNavIndex={setCurrentNavIndex}
                        addTestCase={() => {
                            setForm(prev => ({
                                ...prev,
                                testCases: [
                                    ...prev.testCases,
                                    {
                                        input: [
                                            ...form.functionStructure.parameters.map(param => ({ name: param.name, value: "" })),
                                        ],
                                        output: "",
                                        explanation: "",
                                    },
                                ],
                            }));
                        }}
                    />

                    <div className="flex flex-col gap-2 py-4">
                        {currentTestCase?.input.map((input, index) => {
                            return (
                                <div key={index} className="flex flex-col gap-2 mb-2">
                                    <label htmlFor={`input-${index}`} className="font-semibold text-darkText900">
                                        {input.name}
                                    </label>
                                    <input
                                        type="text"
                                        name=""
                                        id={`input-${index}`}
                                        value={input.value}
                                        onChange={e => {
                                            setForm(prev => ({
                                                ...prev,
                                                testCases: prev.testCases.map((testCase, i) => {
                                                    if (i === currentNavIndex) {
                                                        return {
                                                            ...testCase,
                                                            input: testCase.input.map((input, j) => {
                                                                if (j === index) {
                                                                    return {
                                                                        ...input,
                                                                        value: e.target.value,
                                                                    };
                                                                }
                                                                return input;
                                                            }),
                                                        };
                                                    }
                                                    return testCase;
                                                }),
                                            }));
                                        }}
                                        className="w-[900px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                                    />
                                </div>
                            );
                        })}

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-darkText900">Output</label>
                            <input
                                type="text"
                                id={`output`}
                                value={currentTestCase?.output}
                                onChange={e => {
                                    setForm(prev => ({
                                        ...prev,
                                        testCases: prev.testCases.map((testCase, i) => {
                                            if (i === currentNavIndex) {
                                                return {
                                                    ...testCase,
                                                    output: e.target.value,
                                                };
                                            }
                                            return testCase;
                                        }),
                                    }));
                                }}
                                className="w-[900px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border border-red-600 basis-[30%]">
                <button type="submit" className="py-2 px-4 border rounded-xl font-se">
                    submit
                </button>
            </div>
        </>
    );
};
