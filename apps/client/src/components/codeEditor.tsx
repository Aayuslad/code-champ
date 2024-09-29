import { Editor } from "@monaco-editor/react";
import CustomDropdown2 from "./inputs/CustomDropDown2";
import { ProblemStore } from "../stores/problemStore";
import { useEffect, useState } from "react";
import { idToLanguageMappings, languageToIdMppings } from "../config/languageIdMppings";
import { BoilerPlateCode } from "@repo/common/zod";
import { UiStore } from "../stores/uiStore";
import useDebounce from "../hooks/useDebounce";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { AuthStore } from "../stores/authStore";
import toast from "react-hot-toast";

export default function CodeEditor({ problemId, navToResult }: { problemId: string; navToResult: () => void }) {
    const problemStore = ProblemStore();
    const authStore = AuthStore();
    const uiStore = UiStore();
    const problem = problemStore.onGoingProblems.find(problem => problem.id === problemId);
    const [language, setLanguage] = useState<string>();

    useEffect(() => {
        if (!problem) return;
        if (problem?.solutions === undefined || problem.solutions.length === 0) {
            const solution = {
                languageId: languageToIdMppings["cpp"],
                solutionCode: problem?.boilerplateCode["cpp"],
            };
            problemStore.addSolution(problemId, solution);
            setLanguage("cpp");
        } else {
            const languageId = problem.solutions[problem.solutions.length - 1].languageId;
            setLanguage(idToLanguageMappings[languageId]);
        }
    }, []);

    useEffect(() => {
        if (language === undefined) return;
        if (!problem) return;
        if (problem?.solutions === undefined || problem.solutions.length === 0) return;

        const exist = problem.solutions?.find(solution => solution.languageId === languageToIdMppings[language as string]);

        if (!exist) {
            const solution = {
                languageId: languageToIdMppings[language as string],
                solutionCode: problem?.boilerplateCode[language as keyof BoilerPlateCode],
            };
            problemStore.addSolution(problemId, solution);
        } else {
            problemStore.addSolution(problemId, exist);
        }
    }, [language]);

    const handleOnChange = (code: string | undefined) => {
        if (!problem) return;
        const solution = {
            languageId: languageToIdMppings[language as string],
            solutionCode: code as string,
        };
        problemStore.updateSolution(problemId, solution);
    };

    const debouncedValue = useDebounce(problem?.solutions, 2000);

    useEffect(() => {
        if (debouncedValue && authStore.userProfile)
            problemStore.putOngoingProblem({ problemId: problem?.id as string, solutions: JSON.stringify(debouncedValue) });
    }, [debouncedValue]);

    return (
        <div className="h-[92%] mt-3">
            {language && problem?.solutions && (
                <>
                    <div className="h-[100%] rounded-lg overflow-hidden">
                        <Editor
                            height="100%"
                            theme={uiStore.theme === "dark" ? "vs-dark" : "hc-light"}
                            language={language === "python3" ? "python" : language}
                            value={
                                problem?.solutions.find(
                                    solution => solution.languageId === languageToIdMppings[language as string],
                                )?.solutionCode
                            }
                            onChange={code => handleOnChange(code)}
                            options={{
                                padding: {
                                    top: 8,
                                    bottom: 8,
                                },
                                inlineSuggest: { enabled: true },
                                fontSize: 16,
                                formatOnType: true,
                                autoClosingBrackets: "always",
                                minimap: { enabled: false },
                                lineNumbersMinChars: 2,
                                glyphMargin: false,
                                overviewRulerLanes: 0,
                            }}
                        />
                    </div>

                    <div className="flex items-end justify-between pt-2">
                        <button
                            type="button"
                            className="bg-red-600 py-1 px-3 rounded-md text-white"
                            disabled={
                                !problem.solutions.find(
                                    solution => solution.languageId === languageToIdMppings[language as string],
                                )?.solutionCode || problemStore.skeletonLoading
                            }
                            onClick={async () => {
                                if (!authStore.isLoggedIn) toast.error("sing in to submit");
                                else {
                                    const res = await problemStore.submitProblem({
                                        problemId,
                                        languageId: languageToIdMppings[language as string],
                                        solutionCode: problem?.solutions?.find(
                                            solution => solution.languageId === languageToIdMppings[language as string],
                                        )?.solutionCode as string,
                                    });
                                    if (res === true) navToResult();
                                }
                            }}
                        >
                            {problemStore.buttonLoading ? "Submiting..." : "Submit"}
                        </button>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="p-1"
                                title="Reset Code"
                                onClick={() => {
                                    const flag = confirm("Are you sure you want to reset your code? will loose all your code");
                                    flag && problemStore.resetCode(problem.id, language);
                                }}
                            >
                                <FaArrowRotateLeft />
                            </button>

                            <CustomDropdown2
                                minWidth={"100px"}
                                options={Object.keys(languageToIdMppings)}
                                selectedOption={language}
                                setSelectedOption={setLanguage}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
