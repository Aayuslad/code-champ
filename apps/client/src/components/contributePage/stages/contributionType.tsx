import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../inputs/CustomDropDwon";

type Props = {
    contributionType: "Submit a Problem" | "Add a Test Case";
    setContributionType: React.Dispatch<React.SetStateAction<"Submit a Problem" | "Add a Test Case">>;
    setCurrentStage: React.Dispatch<
        React.SetStateAction<
            | "contribute-type"
            | "problem-detailes"
            | "function-template"
            | "test-case-input"
            | "problem-search"
            | "test-case-contribution"
        >
    >;
};

export const ContributionType = ({ setCurrentStage, contributionType, setContributionType }: Props) => {
    const navigate = useNavigate();

    const onClickHandler = () => {
        if (contributionType === "Submit a Problem") {
            setContributionType("Submit a Problem");
            setCurrentStage("problem-detailes");
            navigate("/contribute/problem-detailes");
        } else {
            setContributionType("Add a Test Case");
            setCurrentStage("problem-search");
            navigate("/contribute/problem-search");
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="basis-[60%] flex">
                <div className="basis-[100%] pt-16 text-center text-gray-700 dark:text-gray-300 px-10">
                    <h2 className="text-3xl font-bold mb-4 dark:text-white">Contribute to Code Champ</h2>
                    <p className="text-xl mb-6">Ready to share your skills?</p>
                    <p className="text-lg mb-4 max-w-[500px] mx-auto">
                        At Code Champ, we believe in learning together. If you've come across an exciting problem or a unique test
                        case, here's your chance to share it with the community!
                    </p>
                    <p className="text-lg mb-4 max-w-[500px] mx-auto">
                        Whether it's a tricky algorithm or a clever edge case, we welcome your contribution.
                    </p>
                </div>
            </div>

            <div className="basis-[40%] flex flex-col items-center gap-10">
                <p className="text-xl">Select an option to either submit a problem or add a test case to enhance our platform.</p>

                <div className="space-x-10 flex items-center">
                    <CustomDropdown
                        options={["Submit a Problem", "Add a Test Case"]}
                        selectedOption={contributionType as unknown as string}
                        setSelectedOption={setContributionType as unknown as React.Dispatch<React.SetStateAction<string>>}
                    />
                    <button
                        type="button"
                        className="border-[3px] rounded-xl border-light300 dark:border-dark300 py-0.5 px-3 font-semibold bg-light400 dark:bg-dark300"
                        onClick={onClickHandler}
                    >
                        GO
                    </button>
                </div>
            </div>
        </div>
    );
};
