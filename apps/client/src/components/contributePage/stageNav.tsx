import { TbArrowBigLeftLineFilled, TbArrowBigRightLineFilled } from "react-icons/tb";
import { problemFormStages, testCaseFormStages } from "../../pages/Contribute";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ContributeProblemSchemaType } from "@repo/common/zod";

type Props = {
    stages: typeof testCaseFormStages | typeof problemFormStages;
    currentStage: (typeof testCaseFormStages)[number] | (typeof problemFormStages)[number];
    setCurrentStage: React.Dispatch<
        React.SetStateAction<(typeof testCaseFormStages)[number] | (typeof problemFormStages)[number]>
    >;
    contributionType: "Submit a Problem" | "Add a Test Case";
    form: ContributeProblemSchemaType;
};

const validateProblemDetails = (form: ContributeProblemSchemaType) => {
    return form.title !== "" && form.description !== "" && form.topicTags.length > 0;
};

const validateFunctionTemplate = (form: ContributeProblemSchemaType) => {
    return (
        form.functionStructure.functionName !== "" &&
        form.functionStructure.description !== "" &&
        form.functionStructure.parameters.length > 0
    );
};

const validateTestCases = (form: ContributeProblemSchemaType) => {
    return form.sampleTestCases.length > 0 && form.testCases.length > 0;
};

export const StageNav = ({ stages, currentStage, setCurrentStage, contributionType, form }: Props) => {
    const navigate = useNavigate();
    //@ts-ignore
    const currentStageIndex = stages.indexOf(currentStage);

    const validateStageTransition = (currentStage: string, newStage: string) => {
        if (currentStage === "problem-detailes" && newStage === "function-template" && !validateProblemDetails(form)) {
            toast("Please fill in all the required fields.");
            return false;
        }

        if (currentStage === "function-template" && newStage === "test-case-input" && !validateFunctionTemplate(form)) {
            toast("Please fill in all the required fields.");
            return false;
        }

        if (currentStage === "test-case-input" && newStage === "contribute-type" && !validateTestCases(form)) {
            toast("At least one sample test case and one test case are required.");
            return false;
        }

        return true;
    };

    const handleStageChange = (direction: "prev" | "next") => {
        const newIndex = direction === "prev" ? currentStageIndex - 1 : currentStageIndex + 1;

        if (newIndex >= 0 && newIndex < stages.length) {
            const newStage = stages[newIndex];

            if (!validateStageTransition(currentStage, newStage)) {
                return;
            }

            setCurrentStage(newStage);
            navigate(`/contribute/${newStage}`);
        }
    };

    const progressPercentage = (currentStageIndex / (contributionType === "Submit a Problem" ? 4 : 3)) * 100;

    return (
        <div className="h-[80px] flex items-center justify-around mt-4">
            <button
                type="button"
                className="text-4xl disabled:opacity-50"
                onClick={() => handleStageChange("prev")}
                disabled={currentStage === stages[0]}
            >
                <TbArrowBigLeftLineFilled />
            </button>

            <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <button
                type="button"
                className="text-4xl disabled:opacity-50"
                onClick={() => handleStageChange("next")}
                disabled={currentStage === stages[stages.length - 1]}
            >
                <TbArrowBigRightLineFilled />
            </button>
        </div>
    );
};
