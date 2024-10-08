import CustomDropdown from "../../inputs/CustomDropDwon";

type Props = {
    constributionType: "Submit a Problem" | "Add a Test Case";
    setContributionType: React.Dispatch<React.SetStateAction<"Submit a Problem" | "Add a Test Case">>;
};

export const ContributionType = ({ constributionType, setContributionType }: Props) => {
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

                {/* <div className="basis-[50%] pt-16 text-left text-gray-700 dark:text-gray-300 px-10">
                    <h3 className="text-3xl font-bold mb-3 dark:text-white">Why Contribute?</h3>
                    <p className="text-lg py-2">Help the community grow and become stronger.</p>
                    <p className="text-lg py-2">Get recognized for your contributions through badges and leaderboards.</p>
                    <p className="text-lg py-2">
                        Contribute to high-quality problems that can prepare users for interviews and competitions.
                    </p>
                </div> */}
            </div>

            <div className="basis-[40%] flex flex-col items-center gap-10">
                <p className="text-xl">Select an option to either submit a problem or add a test case to enhance our platform.</p>

                <CustomDropdown
                    options={["Submit a Problem", "Add a Test Case"]}
                    selectedOption={constributionType as unknown as string}
                    setSelectedOption={setContributionType as unknown as React.Dispatch<React.SetStateAction<string>>}
                />
            </div>
        </div>
    );
};
