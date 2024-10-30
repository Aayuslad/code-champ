import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProblemStore } from "../stores/problemStore";
import { RandomProblemButton } from "./buttons/randomProblem";
import ProblemSearchBox from "./inputs/problemSearchBox";
import TopicTagsDropDwon from "./inputs/topictagsDropDwon";
import { IoMdClose } from "react-icons/io";
import DifficultyDropdown from "./inputs/difficultyDropDwon";
import { FaSort } from "react-icons/fa6";
import { TOIPC_TAGS } from "../config/toipcTags";

export function ProblemSetTable() {
    const problemStore = ProblemStore();
    const navigate = useNavigate();
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [difficultys, setDifficultys] = useState<string[]>([]);

    return (
        <div className="problemsTable w-full">
            <form className="searchAndFilterBar w-full max-w-[800px] flex gap-2 items-center">
                <ProblemSearchBox />

                <TopicTagsDropDwon options={TOIPC_TAGS} selectedOptions={selectedTopics} setSelectedOptions={setSelectedTopics} />

                <DifficultyDropdown
                    options={["Basic", "Easy", "Medium", "Hard"]}
                    selectedOptions={difficultys}
                    setSelectedOptions={setDifficultys}
                />

                <RandomProblemButton />
            </form>

            <div className="selectedTopics mt-3">
                {difficultys.map((diff, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setDifficultys(prev => prev.filter(d => d !== diff));
                        }}
                        className="w-fit inline-flex items-center justify-center border px-2.5 rounded-2xl mx-1 my-1 text-xs font-semibold cursor-pointer border-gray-400 dark:border-gray-600"
                    >
                        <span
                            className={`pb-1 py-1 ${diff === "Basic" ? "text-green-500" : diff === "Easy" ? "text-blue-500" : diff === "Medium" ? "text-yellow-500" : "text-red-500"}`}
                        >
                            {diff}
                        </span>
                        <div className="flex items-center justify-center text-sm ml-1">
                            <IoMdClose />
                        </div>
                    </div>
                ))}

                {selectedTopics.map((topic, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            setSelectedTopics(prevTopics => prevTopics.filter(t => t !== topic));
                        }}
                        className="w-fit inline-flex items-center justify-center border-[1.5px] px-2.5 rounded-2xl mx-1 my-1 text-xs cursor-pointer border-gray-400 dark:border-gray-600"
                    >
                        <span className="pb-1 py-1">{topic}</span>
                        <div className="flex items-center justify-center text-sm ml-1">
                            <IoMdClose />
                        </div>
                    </div>
                ))}
            </div>

            <table className=" w-full max-w-[800px] border-separate border-spacing-y-2">
                <thead>
                    <tr className="h-10 backdrop:blur-md rounded-lg font-semibold">
                        <th className="font-semibold w-[5%]">#</th>
                        <th className="font-semibold w-[10%]">Status</th>
                        <th className="font-semibold w-[48%]">Title</th>
                        <th className="font-semibold w-[20%]">
                            <div className="flex items-center justify-center gap-2">
                                <span className="inline-block">Acceptance</span>
                                <span className="iline-block flex justify-center items-center">
                                    <FaSort />
                                </span>
                            </div>
                        </th>
                        <th className="font-semibold w-[20%]  pt-1 gap-2 pl-4">
                            <div className="flex items-center justify-center gap-2">
                                <span>Difficulty</span>
                                <span className="flex justify-center items-center">
                                    <FaSort />
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {problemStore.feedProblems.map((problem, index) => {
                        if (difficultys.length > 0) {
                            if (!difficultys.includes(problem.difficulty)) return null;
                        }

                        if (selectedTopics.length > 0) {
                            if (!selectedTopics.some(topic => problem.topicTags.includes(topic))) return null;
                        }

                        return (
                            <tr
                                key={index}
                                className={`h-10 backdrop:blur-md  ${index % 2 ? "bg-lightTableRow2 dark:bg-darkTableRow2" : "bg-lightTableRow1 dark:bg-darkTableRow1"} rounded-lg cursor-pointer`}
                                onClick={() => navigate(`/solve-problem/${problem.id}/Problem/Code`)}
                            >
                                <td className="rounded-l-lg text-center">{problem.problemNumber}</td>
                                <td className="text-center">{problem.isSolved ? "✓" : "-"}</td>
                                <td>{problem.title}</td>
                                <td className="text-center">{problem.acceptanceRate}</td>
                                <td
                                    className={`rounded-r-lg text-center ${problem.difficulty === "Basic" ? "text-green-500" : problem.difficulty === "Easy" ? "text-blue-500" : problem.difficulty === "Medium" ? "text-yellow-500" : problem.difficulty === "Hard" ? "text-red-500" : ""}`}
                                >
                                    {problem.difficulty}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
