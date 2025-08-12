import { ContributeProblemSchemaType } from "@repo/common/zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StageNav } from "../components/contributePage/stageNav";
import { ContributionType } from "../components/contributePage/stages/contributionType";
import { FunctionTemplate } from "../components/contributePage/stages/functionTemplate";
import { ProblemDetails } from "../components/contributePage/stages/problemDetails";
import { TestCaseInput } from "../components/contributePage/stages/testCaseInput";
import { Header } from "../components/headers/hader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";
import { ProblemStore } from "../stores/problemStore";
import { ProblemSearch } from "../components/contributePage/stages/problemSearch";
import { TestCaseContribution } from "../components/contributePage/stages/testCaseContribution";

export const problemFormStages = ["contribute-type", "problem-detailes", "function-template", "test-case-input"] as const;
export const testCaseFormStages = ["contribute-type", "problem-search", "test-case-contribution"] as const;
export const baseTypes = ["int", "short", "long", "float", "double", "boolean", "char", "String", "void"] as const;
export const derivedTypes = ["Array", "LinkedList", "Set", "Map", "Queue", "Stack", "TreeNode", "GraphNode"] as const;
export const typeModifier = ["no type modifier", "unsigned", "short", "long", "longLong", "const", "volatile"] as const;

export default function Contribute() {
    const navigate = useNavigate();
    const problemStore = ProblemStore();
    const { stage } = useParams<{ stage: (typeof problemFormStages)[number] | (typeof testCaseFormStages)[number] }>();
    const [contributionType, setContributionType] = useState<"Submit a Problem" | "Add a Test Case">("Submit a Problem");
    const [currentStage, setCurrentStage] = useState<(typeof problemFormStages)[number] | (typeof testCaseFormStages)[number]>(
        stage || "contribute-type",
    );
    const [problemForm, setProblemForm] = useState<ContributeProblemSchemaType>({
        title: "",
        description: "",
        functionStructure: {
            title: "",
            description: "",
            functionName: "",
            parameters: [],
            returnType: {
                baseType: "int",
                derivedType: undefined,
                category: "base",
                typeModifier: undefined,
                description: "",
            },
        },
        visibility: "Public",
        boilerplateCode: "",
        submissionCode: "",
        testCases: [],
        sampleTestCases: [],
        difficultyLevel: "Basic",
        topicTags: [],
        constraints: [],
        hints: [],
    });

    useEffect(() => {
        if (stage) {
            setCurrentStage(stage);
        } else {
            navigate("/contribute/home", { replace: true });
        }
    }, [stage, navigate]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    function handleProblemFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        problemStore.contributeProblem(problemForm);
    }

    function handleTestCaseFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // problemStore.contributeTestCase(testCaseForm);
    }

    return (
        <div className="Contribute Page">
            <SideNavbar />

            <MainWrapper>
                <Header />
                {currentStage === "contribute-type" && (
                    <div className="min-h-[calc(100vh-152px)] h-fit flex">
                        <ContributionType
                            contributionType={contributionType}
                            setContributionType={setContributionType}
                            setCurrentStage={setCurrentStage}
                        />
                    </div>
                )}

                {contributionType === "Submit a Problem" && currentStage !== "contribute-type" && (
                    <>
                        <form
                            className="min-h-[calc(100vh-152px)] h-fit flex"
                            onSubmit={handleProblemFormSubmit}
                            onKeyDown={e => {
                                const target = e.target as HTMLElement;

                                // Only prevent "Enter" for input fields, not textareas or other elements
                                if (e.key === "Enter" && target.tagName === "INPUT") {
                                    e.preventDefault();
                                }
                            }}
                        >
                            {currentStage === "problem-detailes" && (
                                <ProblemDetails form={problemForm} setForm={setProblemForm} />
                            )}

                            {currentStage === "function-template" && (
                                <FunctionTemplate form={problemForm} setForm={setProblemForm} />
                            )}

                            {currentStage === "test-case-input" && <TestCaseInput form={problemForm} setForm={setProblemForm} />}
                        </form>
                        <StageNav
                            stages={problemFormStages}
                            currentStage={currentStage}
                            setCurrentStage={setCurrentStage}
                            contributionType={contributionType}
                            form={problemForm}
                        />
                    </>
                )}

                {contributionType === "Add a Test Case" && currentStage !== "contribute-type" && (
                    <>
                        <form
                            className="min-h-[calc(100vh-152px)] h-fit flex"
                            onSubmit={handleTestCaseFormSubmit}
                            onKeyDown={e => {
                                const target = e.target as HTMLElement;

                                // Only prevent "Enter" for input fields, not textareas or other elements
                                if (e.key === "Enter" && target.tagName === "INPUT") {
                                    e.preventDefault();
                                }
                            }}
                        >
                            {currentStage === "problem-search" && <ProblemSearch />}
                            {currentStage === "test-case-contribution" && <TestCaseContribution />}
                        </form>
                        <StageNav
                            stages={testCaseFormStages}
                            currentStage={currentStage}
                            setCurrentStage={setCurrentStage}
                            contributionType={contributionType}
                            form={problemForm}
                        />
                    </>
                )}
            </MainWrapper>
        </div>
    );
}
