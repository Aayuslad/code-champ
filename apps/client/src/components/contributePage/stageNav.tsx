import { TbArrowBigLeftLineFilled, TbArrowBigRightLineFilled } from "react-icons/tb";
import { stages } from "../../pages/Contribute";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ContributeProblemSchemaType } from "@repo/common/zod";

type props = {
    currentStage: (typeof stages)[number];
    setCurrentStage: React.Dispatch<React.SetStateAction<(typeof stages)[number]>>;
    constributionType: "Submit a Problem" | "Add a Test Case";
    form: ContributeProblemSchemaType;
};

export const StageNav = ({ currentStage, setCurrentStage, constributionType, form }: props) => {
    const navigate = useNavigate();

    const handleStageChange = (direction: "prev" | "next") => {
        const currentIndex = stages.indexOf(currentStage);
        const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;

        if (newIndex >= 0 && newIndex < stages.length) {
            const newStage = stages[newIndex];

            if (constributionType === "Add a Test Case") {
                toast("Adding test cases is not available yet.");
                return;
            }

            if (currentStage === "problem-detailes" && newStage === "function-template") {
                if (form.title === "" || form.description === "" || form.topicTags.length === 0) {
                    toast("Please fill in all the required fields.");
                    return;
                }
            }

            if (currentStage === "function-template" && newStage === "test-case-input") {
                if (form.functionStructure.functionName === "" || form.functionStructure.parameters.length === 0) {
                    toast("Please fill in all the required fields.");
                    return;
                }
            }

            if (currentStage === "test-case-input" && newStage === "contribute-type") {
                if (form.sampleTestCases.length === 0) {
                    toast("At least one sample test case is required.");
                    return;
                }

                if (form.testCases.length === 0) {
                    toast("At least one test case is required.");
                    return;
                }
            }

            setCurrentStage(newStage);
            navigate(`/contribute/${newStage}`);
        }
    };

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

            <div></div>

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
