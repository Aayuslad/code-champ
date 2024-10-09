import { ContributeProblemSchemaType } from "@repo/common/zod";
import { TOIPC_TAGS } from "../../../config/toipcTags";
import { TopicDropDwon } from "../inputs/topicDropdown";
import { DifficultyDropdown } from "../inputs/difficultyDropdown";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegLightbulb } from "react-icons/fa6";

type Props = {
    form: ContributeProblemSchemaType;
    setForm: React.Dispatch<React.SetStateAction<ContributeProblemSchemaType>>;
};

export const ProblemDetails = ({ form, setForm }: Props) => {
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setForm(prev => ({
            ...prev,
            title: newTitle,
            functionStructure: { ...prev.functionStructure, title: newTitle },
        }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, description: e.target.value }));
    };

    const handleHintChange = (index: number, value: string) => {
        setForm(prev => {
            const newHints = [...prev.hints];
            newHints[index] = value;
            return { ...prev, hints: newHints };
        });
    };

    const handleRemoveHint = (index: number) => {
        setForm(prev => ({
            ...prev,
            hints: prev.hints.filter((_, i) => i !== index),
        }));
    };

    const handleAddHint = () => {
        setForm(prev => ({ ...prev, hints: [...prev.hints, ""] }));
    };

    return (
        <>
            <div className="basis-[70%] flex flex-col gap-6 px-10 pt-10 overflow-scroll no-scrollbar">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="font-semibold dark:text-darkText900">
                        Problem Title *
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={form.title}
                        maxLength={60}
                        onChange={handleTitleChange}
                        className="w-full bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2 -mb-3">
                    <label htmlFor="description" className="font-semibold">
                        Problem Statement *
                    </label>
                    <textarea
                        id="description"
                        value={form.description}
                        onChange={handleDescriptionChange}
                        className="bg-transparent h-[200px] border-2 border-light300 dark:border-dark300 rounded-md p-4 outline-none"
                        maxLength={700}
                    ></textarea>
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-right">{form.description.length}/700</div>
                </div>

                <div className="flex gap-10">
                    <div className="flex flex-col gap-2 -z-100">
                        <label className="font-semibold">Difficulty Level *</label>
                        <DifficultyDropdown
                            options={["Basic", "Easy", "Medium", "Hard"]}
                            selectedOption={form.difficultyLevel}
                            setSelectedOption={(value: "Basic" | "Easy" | "Medium" | "Hard") =>
                                setForm(prev => ({ ...prev, difficultyLevel: value }))
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Tags *</label>
                        <TopicDropDwon
                            options={TOIPC_TAGS}
                            selectedOptions={form.topicTags}
                            setSelectedOptions={newOptions => setForm(prev => ({ ...prev, topicTags: [...newOptions] }))}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="hints" className="font-semibold">
                        Hints
                    </label>
                    <div className="flex flex-col gap-2">
                        {form.hints.map((hint, index) => (
                            <div key={index} className="flex items-center gap-2 w-[600px]">
                                <input
                                    type="text"
                                    value={hint}
                                    onChange={e => handleHintChange(index, e.target.value)}
                                    className="flex-grow bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                                    placeholder={`Hint ${index + 1}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveHint(index)}
                                    className="text-2xl text-lightText800 hover:text-lightText900 dark:text-darkText900 dark:hover:text-darkText900"
                                >
                                    <IoIosCloseCircleOutline />
                                </button>
                            </div>
                        ))}
                    </div>

                    {form.hints.length < 3 && (
                        <button
                            type="button"
                            onClick={handleAddHint}
                            className="self-start text-lightText800 hover:text-lightText900 dark:text-darkText900 dark:hover:text-darkText900"
                        >
                            + Add a hint
                        </button>
                    )}
                </div>
            </div>

            <div className="basis-[30%] p-8 pr-8 pl-4 text-lightText800 dark:text-darkText800 flex flex-col">
                <h3 className="font-semibold text-lg mb-4 flex gap-3 items-center">
                    <FaRegLightbulb />
                    <span>Tips for Creating a Good Problem:</span>
                </h3>
                <ul className="list-disc pl-5 space-y-4 text-sm">
                    <li>
                        <strong className="block mb-2">Problem Title:</strong>
                        Choose a concise and descriptive title that accurately reflects the problem's content.
                    </li>
                    <li className="mt-6">
                        <strong className="block mb-2">Problem Statement:</strong>
                        <ul className="list-circle pl-5 mt-3 space-y-2">
                            <li>
                                <b>Conciseness</b>: Clearly state the problem without unnecessary details or jargon.
                            </li>
                            <li>
                                <b>Completeness</b>: Provide all the information needed to understand the problem and its
                                constraints.
                            </li>
                            <li>
                                <b>Examples</b>: You can add examples in further part of form.
                            </li>
                        </ul>
                    </li>
                    <li className="mt-6">
                        <strong className="block mb-2">Difficulty Level:</strong>
                        Select the appropriate difficulty level based on the problem's complexity.
                    </li>
                    <li className="mt-6">
                        <strong className="block mb-2">Tags:</strong>
                        Choose tags that accurately describe the problem's topics or algorithms.
                    </li>
                    <li className="mt-6">
                        <strong className="block mb-2">Hints (Optional):</strong>
                        <ul className="list-circle pl-5 mt-3 space-y-2">
                            <li>
                                <b>Relevance:</b> Provide hints that offer guidance without giving away the solution.
                            </li>
                            <li>
                                <b>Progression</b>: Consider providing hints in increasing order of difficulty.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    );
};
