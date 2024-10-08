import { ContributeProblemSchemaType } from "@repo/common/zod";
import { TOIPC_TAGS } from "../../../config/toipcTags";
import { TopicDropDwon } from "../inputs/topicDropdown";
import { DifficultyDropdown } from "../inputs/difficultyDropdown";
import { IoIosCloseCircleOutline } from "react-icons/io";

type Props = {
    form: ContributeProblemSchemaType;
    setForm: React.Dispatch<React.SetStateAction<ContributeProblemSchemaType>>;
};

export const ProblemDetails = ({ form, setForm }: Props) => {
    return (
        <>
            <div className="basis-[70%] flex flex-col gap-6 px-10 pt-10 overflow-scroll no-scrollbar">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="font-semibold  dark:text-darkText900">
                        Problem Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={form.title}
                        maxLength={60}
                        onChange={e =>
                            setForm({
                                ...form,
                                title: e.target.value,
                                functionStructure: { ...form.functionStructure, title: e.target.value },
                            })
                        }
                        className="w-full bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="discription" className="font-semibold">
                        Problem Statement
                    </label>
                    <textarea
                        id="discription"
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        className="bg-transparent h-[200px] border-2 border-light300 dark:border-dark300 rounded-md p-4 outline-none"
                        maxLength={700}
                    ></textarea>
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-right">{form.description.length}/700</div>
                </div>

                <div className="flex gap justify gap-20">
                    <div className="flex flex-col gap-2 -z-100">
                        <label className="font-semibold">Difficulty Level</label>
                        <DifficultyDropdown
                            options={["Basic", "Easy", "Medium", "Hard"]}
                            selectedOption={form.difficultyLevel}
                            setSelectedOption={(value: "Basic" | "Easy" | "Medium" | "Hard") =>
                                setForm(prev => ({ ...prev, difficultyLevel: value }))
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold">Tags</label>
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
                                    onChange={e => {
                                        const newHints = [...form.hints];
                                        newHints[index] = e.target.value;
                                        setForm({ ...form, hints: newHints });
                                    }}
                                    className="flex-grow bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                                    placeholder={`Hint ${index + 1}`}
                                />
                                <button
                                    onClick={() => {
                                        const newHints = form.hints.filter((_, i) => i !== index);
                                        setForm({ ...form, hints: newHints });
                                    }}
                                    className="text-2xl text-lightText800 hover:text-lightText900 dark:text-darkText900 dark:hover:text-darkText900"
                                >
                                    <IoIosCloseCircleOutline />
                                </button>
                            </div>
                        ))}
                        
                    </div>

                    {form.hints.length < 3 && (
                        <button
                            onClick={() => setForm({ ...form, hints: [...form.hints, ""] })}
                            className="self-start text-lightText800 hover:text-lightText900 dark:text-darkText900 dark:hover:text-darkText900"
                        >
                            + Add a hint
                        </button>
                    )}
                </div>
            </div>

            <div className="border border-red-600 basis-[30%]">// add tips here</div>
        </>
    );
};
