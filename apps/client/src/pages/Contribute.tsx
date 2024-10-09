import { BaseTypes, ContributeProblemSchemaType } from "@repo/common/zod";
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

export const stages = ["contribute-type", "problem-detailes", "function-template", "test-case-input"] as const;
export const baseTypes = ["int", "short", "long", "float", "double", "boolean"] as const;
export const derivedTypes = ["Array", "LinkedList", "Set", "Map", "Queue", "Stack", "TreeNode", "GraphNode"] as const;
export const typeModifier = ["no type modifier", "unsigned", "short", "long", "longLong", "const", "volatile"] as const;
type Stage = (typeof stages)[number];
type BaseType = (typeof baseTypes)[number];
type DerivedType = (typeof derivedTypes)[number];
type TypeModifier = (typeof typeModifier)[number];

export default function Contribute() {
    const navigate = useNavigate();
    const problemStore = ProblemStore();
    const { stage } = useParams<{ stage: Stage }>();
    const [constributionType, setContributionType] = useState<"Submit a Problem" | "Add a Test Case">("Submit a Problem");
    const [currentStage, setCurrentStage] = useState<Stage>(stage || "contribute-type");
    const [form, setForm] = useState<ContributeProblemSchemaType>({
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
        if (stage && stages.includes(stage as Stage)) {
            setCurrentStage(stage as Stage);
        } else {
            navigate("/contribute/home", { replace: true });
        }
    }, [stage, navigate]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(form);
        problemStore.contributeProblem(form);
    }

    return (
        <div className="Contribute Page">
            <SideNavbar />

            <MainWrapper>
                <Header />
                <form className="min-h-[calc(100vh-152px)] h-fit flex" onSubmit={handleSubmit}>
                    {currentStage === "contribute-type" && (
                        <ContributionType constributionType={constributionType} setContributionType={setContributionType} />
                    )}

                    {currentStage === "problem-detailes" && <ProblemDetails form={form} setForm={setForm} />}

                    {currentStage === "function-template" && <FunctionTemplate form={form} setForm={setForm} />}

                    {currentStage === "test-case-input" && <TestCaseInput form={form} setForm={setForm} />}
                </form>

                <StageNav
                    currentStage={currentStage}
                    setCurrentStage={setCurrentStage}
                    constributionType={constributionType}
                    form={form}
                />
            </MainWrapper>
        </div>
    );
}
