import { ProblemType, submission } from "@repo/common/zod";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import CodeEditor from "../components/codeEditor";
import { ContainerSplitter } from "../components/containerSplitter";
import { PorblemPageHeader } from "../components/headers/problemPageHeader";
import { Navbar02 } from "../components/navbars/navbar02";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";
import { idToLanguageMappings } from "../config/languageIdMppings";
import { formatDate } from "../helper/formatDate";
import { ProblemStore } from "../stores/problemStore";

export default function SolveProblem() {
    const problemStore = ProblemStore();
    const navigate = useNavigate();
    const { id, nav1, nav2 } = useParams<{
        id: string;
        nav1: string;
        nav2: string;
    }>();
    const [leftWidth, setLeftWidth] = useState(50);
    const [activeNav1, setActiveNav1] = useState<string>(nav1 || "Problem");
    const [activeNav2, setActiveNav2] = useState<string>(nav2 || "Code");

    useEffect(() => {
        setActiveNav1(nav1 || "Problem");
    }, [nav1]);

    useEffect(() => {
        setActiveNav2(nav2 || "Code");
    }, [nav2]);

    useEffect(() => {
        if (!id) return;
        (async () => {
            await problemStore.getProblem(id);
        })();
    }, [id]);

    useEffect(() => {
        switch (activeNav1) {
            case "Problem":
                break;
            case "Solution":
                break;
            case "Discussion":
                break;
            case "Submissions":
                // (async () => {
                //     const submissions = await problemStore.getSubmissions({ problemId: id as string });
                //     console.log(submissions);
                //     submissions && setSubmissions(submissions);
                // })();
                problemStore.getProblemSubmissions(id as string);
                break;
            default:
                break;
        }
    }, [nav1]);

    useEffect(() => {
        switch (activeNav2) {
            case "Code":
                break;
            case "Test Cases":
                break;
            case "Discussions":
                break;
            case "Submissions":
                break;
            default:
                break;
        }
    }, [nav2]);

    const problem = problemStore.onGoingProblems.find(problem => problem.id === id);
    console.log(problem);

    return (
        <div className="SolveProblemPage">
            <SideNavbar />

            {problem && (
                <MainWrapper>
                    <PorblemPageHeader problemNumber={problem?.problemNumber} title={problem.title} />

                    <div className="w-full h-[calc(100vh-3rem)] flex ">
                        {/* Left container */}
                        <div
                            className="w-[50%] pt-2.5 pb-1.5 px-6 flex flex-col gap-2 overflow-y-auto no-scrollbar"
                            style={{ width: `${leftWidth}%` }}
                        >
                            <Navbar02
                                navs={["Problem", "Solution", "Discussion", "Submissions"]}
                                currentNav={activeNav1}
                                setCurrentNav={setActiveNav1}
                                baseRoute={`solve-problem/${id}/nav/${activeNav2}`}
                            />

                            {activeNav1 === "Problem" && <Problem problem={problem} />}
                            {activeNav1 === "Solution" && <div>Solution</div>}
                            {activeNav1 === "Discussion" && <div>Discussion</div>}
                            {activeNav1 === "Submissions" && <Submissions submissions={problem.submissions} />}
                        </div>

                        {/* Splitter */}
                        <ContainerSplitter setLeftWidth={setLeftWidth} />

                        {/* Right container */}
                        <div className="flex-1 w-[50%] pt-2.5 pb-1.5 px-6 flex flex-col" style={{ width: `${100 - leftWidth}%` }}>
                            <Navbar02
                                navs={["Code", "Result"]}
                                currentNav={activeNav2}
                                setCurrentNav={setActiveNav2}
                                baseRoute={`solve-problem/${id}/${activeNav1}/nav`}
                            />

                            {activeNav2 === "Code" && (
                                <div className="flex-1">
                                    <CodeEditor
                                        problemId={problem.id}
                                        navToResult={() => {
                                            navigate(`/solve-problem/${id}/${activeNav1}/Result`);
                                        }}
                                    />
                                </div>
                            )}

                            {activeNav2 === "Result" && <Result problem={problem} />}
                        </div>
                    </div>
                </MainWrapper>
            )}

            {!problem && problemStore.skeletonLoading && "Skeleton loading ..."}
        </div>
    );
}

const Problem = ({ problem }: { problem: ProblemType }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold pt-1 pb-2 -ml-1">Problem Statement</h2>
            <p className="text-justify pb-5">{problem.description}</p>
            {problem.exampleTestCases.map((example, index) => {
                return (
                    <div key={index} className="pb-5">
                        <h2 className="text-lg font-semibold pt-1 pb-2 -ml-1">Example {index + 1}</h2>

                        <div className="border-l-4 border-light300 dark:border-dark300 pl-4">
                            <div className="space-x-2 flex">
                                <span className="font-medium">Input: </span>
                                <span>
                                    {example.input.map((input, index) => (
                                        <div key={index}>
                                            <span>{input.name + " = "}</span>
                                            <span>{input.value}</span>
                                        </div>
                                    ))}
                                </span>
                            </div>
                            <div className="space-x-2">
                                <span className="font-medium">Output: </span>
                                <span>{example.output}</span>
                            </div>
                            <div className="space-x-2">
                                <span className="font-medium">Explanation: </span>
                                <span>{example.explanation}</span>
                            </div>
                        </div>
                    </div>
                );
            })}

            <h2 className="text-lg font-semibold pt-1 pb-2 -ml-1">Constraints</h2>
            <ul className="list-disc pl-5 pb-5">
                {problem.constraints.map((constraint, index) => (
                    <li key={index} className="text-justify pb-2">
                        {constraint}
                    </li>
                ))}
            </ul>
            <h2 className="text-lg font-semibold pt-1 pb-2 -ml-1">Topic Tags</h2>
            <ul className="flex gap-3 pb-5">
                {problem.topicTags.map((tag, index) => {
                    return (
                        <span key={index} className=" bg-lightTableRow1 text-sm backdrop:blur-md px-2.5 py-0.5 rounded-[100vh]">
                            {tag}
                        </span>
                    );
                })}
            </ul>
            <h2 className="text-lg font-semibold pt-1 pb-2 -ml-1">Hints</h2>
            <ul className=" pb-5">
                {problem.hints.map((hint, index) => (
                    <li key={index} className="text-justify pb-2 cursor-pointer">
                        <details>
                            <summary>Hint {index + 1}</summary>
                            <p className="py-0.5">{hint}</p>
                        </details>
                    </li>
                ))}
            </ul>
            <div className="flex items-center justify-start gap-4 mt-1 mb-4">
                <span className="text-lightText800 dark:text-darkText800 font-semibold">
                    Accepted{" "}
                    <span className="text-lightText900 dark:text-darkText900 font-normal">{problem.acceptedSubmissions}</span>
                </span>
                <span className="text-2xl text-lightText800 dark:text-darkText800 leading-[1px]">|</span>
                <span className="text-lightText800 dark:text-darkText800 font-semibold">
                    Submittions{" "}
                    <span className="text-lightText900 dark:text-darkText900 font-normal">{problem.submissionCount}</span>
                </span>
                <span className="text-2xl text-lightText800 dark:text-darkText800 leading-[1px]">|</span>
                <span className="text-lightText800 dark:text-darkText800 font-semibold">
                    Acceptance Rate{" "}
                    <span className="text-lightText900 dark:text-darkText900 font-normal">{problem.acceptanceRate}</span>
                </span>
            </div>
        </div>
    );
};

const Submissions = ({ submissions }: { submissions?: submission[] }) => {
    return (
        <div>
            {submissions &&
                submissions.map(submission => {
                    const date = new Date(submission.createdAt);
                    const string = date.toISOString();
                    return (
                        <div className="  bg-light300 dark:bg-dark300 mb-2 px-4 py-6 rounded-md flex justify-between items-center cursor-pointer">
                            <span
                                className={`font-semibold ${submission.status === "Accepted" ? "text-green-500" : "text-red-600"}`}
                            >
                                {submission.status}
                            </span>
                            <span>{idToLanguageMappings[parseInt(submission.languageId)]}</span>
                            <span>{formatDate(string)}</span>
                        </div>
                    );
                })}
        </div>
    );
};

const Result = ({ problem }: { problem: ProblemType }) => {
    const problemStore = ProblemStore();
    const resultRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (resultRef.current && problemStore.skeletonLoading) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [problem.result?.tasks?.length]);

    return (
        <div ref={resultRef} className="flex flex-col overflow-scroll pt-2 overflow-y-auto overflow-x-hidden no-scrollbar h-full">
            {problem.result &&
                problem.result.tasks &&
                problem.result.tasks.map((testCase, index) => {
                    return (
                        <details key={index} className="flex flex-col gap-2 rounded-md mb-3 mr-6 bg-light300 dark:bg-dark300">
                            <summary
                                className={`py-2 pl-3 pr-4 font-semibold cursor-pointer flex gap-3 justify-between items-center`}
                            >
                                <div className="flex gap-3">
                                    <span className="px-1 ">{testCase.id + 1}</span>
                                    <span className={`px-1 ${testCase.accepted ? "text-green-500" : "text-red-500"}`}>
                                        {testCase.accepted ? "Accepted" : "Rejected"}
                                    </span>
                                </div>
                                <IoIosArrowForward />
                            </summary>
                            <div className="px-4 py-2 border-t mx-2">
                                <div className="space-x-2 flex">
                                    <span className="font-medium">Input: </span>
                                    <span>
                                        {testCase.inputs.map((input, index) => (
                                            <div key={index}>
                                                <span>{input.name + " = "}</span>
                                                <span>{input.value}</span>
                                            </div>
                                        ))}
                                    </span>
                                </div>
                                <div className="space-x-2">
                                    <span className="font-medium">Output: </span>
                                    <span>{testCase.output}</span>
                                </div>
                                <div>
                                    <span className="font-medium">Expected Output: </span>
                                    <span>{testCase.expectedOutput}</span>
                                </div>
                            </div>
                        </details>
                    );
                })}
            {problemStore.skeletonLoading && problem.result && <div>executing...</div>}
            {!problem.result && <div>No Results</div>}
        </div>
    );
};
