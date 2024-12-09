import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProblemStore } from "../../../stores/problemStore";
import { ProblemTypeForContribution, TestCaseType } from "@repo/common/zod";
import { TestCasesNav } from "../testCasesNav";

export const TestCaseContribution = () => {
    const location = useLocation();
    const problemId = location.state?.problemId || "";
    const problemStore = ProblemStore();
    const [problem, setProblem] = useState<ProblemTypeForContribution>();
    const [currentNav1Index, setCurrentNav1Index] = useState(0);
    const [currentNav2Index, setCurrentNav2Index] = useState(0);
    const [newtTestCases, setNewTestCases] = useState<TestCaseType[]>([]);

    useEffect(() => {
        (async () => {
            const problem = await problemStore.getProblemForContribution(problemId);
            problem && setProblem(problem);
        })();
    }, []);

    const addNewTestCase = () => {
        if (!problem) return;
        setNewTestCases([
            ...newtTestCases,
            {
                input: problem.functionStructure.parameters.map(param => ({
                    name: param.name,
                    value: "",
                })),
                output: "",
                explanation: "",
            },
        ]);
    };

    const handleSubmit = () => {
        problemStore.contributeTestCases({ problemId, contributedTestCases: newtTestCases });
    };

    const renderDeabledTestCases = () => {
        const testCase = problem?.testCases[currentNav1Index];
        return (
            <>
                {testCase?.input.map((input, index) => (
                    <div key={index} className="flex flex-col gap-2 mb-2">
                        <label className="font-semibold text-darkText900">
                            {input.name} {"( "}
                            {problem?.functionStructure.parameters[index].category === "base" &&
                                problem?.functionStructure.parameters[index].baseType}
                            {problem?.functionStructure.parameters[index].category !== "base" &&
                                problem?.functionStructure.parameters[index].derivedType}
                            {" )"}
                        </label>
                        {problem?.functionStructure.parameters[index].category === "base" ? (
                            <input
                                type="text"
                                value={input.value}
                                disabled
                                className="w-[400px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none cursor-not-allowed opacity-70"
                            />
                        ) : (
                            <div className="relative">
                                <textarea
                                    value={input.value}
                                    disabled
                                    className="h-[100px] w-full bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none resize-none cursor-not-allowed opacity-70"
                                />
                                <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                                    Elements: {String(input.value).split(",").length}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-darkText900">
                        Output {"( "}
                        {problem?.functionStructure.returnType.category === "base" &&
                            problem?.functionStructure.returnType.baseType}
                        {problem?.functionStructure.returnType.category !== "base" &&
                            problem?.functionStructure.returnType.derivedType}
                        {" )"}
                    </label>
                    {problem?.functionStructure.returnType.category === "base" ? (
                        <input
                            type="text"
                            value={testCase?.output}
                            disabled
                            className="w-[400px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none cursor-not-allowed opacity-70"
                        />
                    ) : (
                        <div className="relative">
                            <textarea
                                value={testCase?.output}
                                disabled
                                className="h-[100px] w-full bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none resize-none cursor-not-allowed opacity-70"
                            />
                            <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                                Elements: {String(testCase?.output).split(",").length}
                            </span>
                        </div>
                    )}
                </div>
                {testCase?.explanation && (
                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-darkText900">Explanation</label>
                        <input
                            type="text"
                            value={testCase?.explanation}
                            disabled
                            className="w-[400px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none cursor-not-allowed opacity-70"
                        />
                    </div>
                )}
            </>
        );
    };

    const handleInputChange = (index: number, value: string) => {
        setNewTestCases(prev =>
            prev.map((testCase, i) =>
                i === currentNav2Index
                    ? {
                          ...testCase,
                          input: testCase.input.map((input, j) => (j === index ? { ...input, value } : input)),
                      }
                    : testCase,
            ),
        );
    };

    const handleOutputChange = (value: string) => {
        setNewTestCases(prev => prev.map((testCase, i) => (i === currentNav2Index ? { ...testCase, output: value } : testCase)));
    };

    const handleExplanationChange = (value: string) => {
        setNewTestCases(prev =>
            prev.map((testCase, i) => (i === currentNav2Index ? { ...testCase, explanation: value } : testCase)),
        );
    };

    const handleDeleteTestCase = (index: number) => {
        setNewTestCases(prev => prev.filter((_, i) => i !== index));
    };

    const renderNewTestCases = () => {
        const testCase = newtTestCases[currentNav2Index];

        return (
            <>
                {testCase?.input.map((input, index) => (
                    <div key={index} className="flex flex-col gap-2 mb-2">
                        <label htmlFor={`input-${index}`} className="font-semibold text-darkText900">
                            {input.name} {"( "}
                            {problem?.functionStructure.parameters[index].category === "base" &&
                                problem?.functionStructure.parameters[index].baseType}
                            {problem?.functionStructure.parameters[index].category !== "base" &&
                                problem?.functionStructure.parameters[index].derivedType}
                            {" )"}
                        </label>
                        {problem?.functionStructure.parameters[index].category === "base" ? (
                            <input
                                type="text"
                                id={`input-${index}`}
                                value={input.value}
                                onChange={e => handleInputChange(index, e.target.value)}
                                className="w-[400px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                            />
                        ) : (
                            <div className="relative">
                                <textarea
                                    id={`input-${index}`}
                                    value={input.value}
                                    placeholder="Instructions: Add elements of derived data type (e.g., array, linked list, queue) by separating them with commas. Example: 3, 2, 6, 5, 4, 3"
                                    onChange={e => handleInputChange(index, e.target.value)}
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
                        {problem?.functionStructure.returnType.category === "base" &&
                            problem?.functionStructure.returnType.baseType}
                        {problem?.functionStructure.returnType.category !== "base" &&
                            problem?.functionStructure.returnType.derivedType}
                        {" )"}
                    </label>
                    {problem?.functionStructure.returnType.category === "base" ? (
                        <input
                            type="text"
                            id={`output`}
                            value={testCase?.output}
                            onChange={e => handleOutputChange(e.target.value)}
                            className="w-[400px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                        />
                    ) : (
                        <div className="relative">
                            <textarea
                                id={`output`}
                                value={testCase?.output}
                                placeholder="Instructions: Add elements of derived data type (e.g., array, linked list, queue) by separating them with commas. Example: 3, 2, 6, 5, 4, 3"
                                onChange={e => handleOutputChange(e.target.value)}
                                className="h-[100px] w-full bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none resize-none"
                            />
                            <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                                Elements: {testCase?.output.split(",").length}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label htmlFor="explanation" className="font-semibold text-darkText900">
                        Explanation
                    </label>
                    <input
                        type="text"
                        id="explanation"
                        value={testCase?.explanation}
                        onChange={e => handleExplanationChange(e.target.value)}
                        className="w-[400px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                    />
                </div>

                <button
                    type="button"
                    className="py-1 px-3 border-2 rounded-md border-dark300 block ml-auto"
                    onClick={() => handleDeleteTestCase(currentNav2Index)}
                >
                    delete
                </button>
            </>
        );
    };

    return (
        <>
            {problem && (
                <>
                    <div className="basis-[45%] py-6 pl-8 pr-4">
                        {problem && (
                            <div className="space-y-10 flex flex-col">
                                <div>
                                    <div className="text-normal mb-4 flex gap-6 justify-between items-center">
                                        <h2 className="text-xl font-semibold space-x-3">
                                            <span>{problem.problemNumber}</span>
                                            <span>{problem.title}</span>
                                        </h2>
                                        <div className="space-x-4">
                                            <span
                                                className={`${
                                                    problem.difficultyLevel === "Basic"
                                                        ? "text-green-500"
                                                        : problem.difficultyLevel === "Easy"
                                                          ? "text-blue-500"
                                                          : problem.difficultyLevel === "Medium"
                                                            ? "text-yellow-500"
                                                            : problem.difficultyLevel === "Hard"
                                                              ? "text-red-500"
                                                              : ""
                                                }`}
                                            >
                                                {problem.difficultyLevel}
                                            </span>{" "}
                                            <span>
                                                Points:{" "}
                                                {problem.difficultyLevel
                                                    ? problem.difficultyLevel === "Basic"
                                                        ? 1
                                                        : problem.difficultyLevel === "Easy"
                                                          ? 2
                                                          : problem.difficultyLevel === "Medium"
                                                            ? 4
                                                            : 8
                                                    : "-"}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-justify font-poppins">{problem.description}</p>
                                </div>
                                {problem.exampleTestCases.map((example, index) => {
                                    return (
                                        <div key={index}>
                                            <h2 className="text-xl font-semibold mb-3">Example {index + 1}</h2>
                                            <div className="border-l-4 border-light300 dark:border-dark300 pl-4 space-y-2">
                                                <div className="space-y-1">
                                                    <span className="font-medium">Input:</span>
                                                    {example.input.map((input, index) => (
                                                        <div key={index} className="ml-4">
                                                            <span>{input.name} = </span>
                                                            <span>{input.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Output: </span>
                                                    <span>{example.output}</span>
                                                </div>
                                                {example.explanation && (
                                                    <div>
                                                        <span className="font-medium">Explanation: </span>
                                                        <span>{example.explanation}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                {problem.constraints.length > 0 && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-3">Constraints</h2>
                                        <ul className="list-disc pl-5 space-y-2">
                                            {problem.constraints.map((constraint, index) => (
                                                <li key={index} className="text-justify">
                                                    {constraint}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div>
                                    <h2 className="text-xl font-semibold mb-3">Topic Tags</h2>
                                    <ul className="flex flex-wrap gap-3">
                                        {problem.topicTags.map((tag, index) => {
                                            return (
                                                <span
                                                    key={index}
                                                    className="bg-light300 dark:bg-dark300 text-sm backdrop:blur-md px-3 py-1 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                    </ul>
                                </div>
                                {problem.hints.length > 0 && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-3">Hints</h2>
                                        <ul className="space-y-3">
                                            {problem.hints.map((hint, index) => (
                                                <li key={index} className="text-justify cursor-pointer">
                                                    <details>
                                                        <summary className="font-medium">Hint {index + 1}</summary>
                                                        <p className="mt-2 ml-4">{hint}</p>
                                                    </details>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="flex flex-wrap items-center gap-6 mt-6 pb-4">
                                    <span className="text-lightText800 dark:text-darkText800">
                                        <span className="font-semibold">Accepted:</span>{" "}
                                        <span>{problem.acceptedSubmissions}</span>
                                    </span>
                                    <span>|</span>
                                    <span className="text-lightText800 dark:text-darkText800">
                                        <span className="font-semibold">Submissions:</span> <span>{problem.submissionCount}</span>
                                    </span>
                                    <span>|</span>
                                    <span className="text-lightText800 dark:text-darkText800">
                                        <span className="font-semibold">Acceptance Rate:</span>{" "}
                                        <span>{problem.acceptanceRate}%</span>
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="basis-[50%] p-6">
                        <div className="existing-test-cases max-w-[700px]">
                            <h2 className="text-xl font-semibold mb-3">Existing Test Cases</h2>
                            <TestCasesNav
                                testCases={problem?.testCases}
                                currentNavIndex={currentNav1Index}
                                setCurrentNavIndex={setCurrentNav1Index}
                            />
                            <div className="mt-3">{renderDeabledTestCases()}</div>
                        </div>
                        <div className="new-testcases mt-14 ">
                            <h2 className="text-xl font-semibold mb-3">Add Test Cases</h2>
                            <TestCasesNav
                                testCases={newtTestCases}
                                currentNavIndex={currentNav2Index}
                                addTestCase={addNewTestCase}
                                setCurrentNavIndex={setCurrentNav2Index}
                                navIndexOfset={problem.testCasesCount}
                            />

                            <div className="mt-3">{renderNewTestCases()}</div>
                        </div>

                        <div className="mt-14">
                            Test cases are added after admin approval. Ensure they are genuine, improve problem coverage, and
                            enhance the overall quality of the challenge.
                        </div>

                        <button
                            type="submit"
                            disabled={problemStore.buttonLoading}
                            onClick={handleSubmit}
                            className="py-2 mt-6 px-4 rounded-xl font-semibold block ml-auto text-inerit dark:text-white bg-light400 dark:bg-dark300 "
                        >
                            {problemStore.buttonLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </>
            )}

            {problemStore.skeletonLoading && !problem && <div>Loading...</div>}
        </>
    );
};
