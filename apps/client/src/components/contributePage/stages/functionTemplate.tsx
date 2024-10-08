import { ContributeProblemSchemaType } from "@repo/common/zod";
import { baseTypes, derivedTypes, typeModifier } from "../../../pages/Contribute";
import BaseTypesDropDown from "../inputs/baseTypesDropDown";
import CustomDropDown from "../inputs/customDropDown";
import DerivedTypesDropDown from "../inputs/derivedTypesDropDown";
import TypeModifierDropDown from "../inputs/typeModifireDropDown";
import { useEffect } from "react";
import { generateBoilerplate } from "../../../utils/boilerplateGenerator/boilerplateGenerator";
import { generateSubmissionCode } from "../../../utils/boilerplateGenerator/submissionCodeGenerator";
import CodeEditor from "../codeEditor";
import { IoIosCloseCircleOutline } from "react-icons/io";

type Props = {
    form: ContributeProblemSchemaType;
    setForm: React.Dispatch<React.SetStateAction<ContributeProblemSchemaType>>;
};

export const FunctionTemplate = ({ form, setForm }: Props) => {
    useEffect(() => {
        console.log("Boilerplate", generateBoilerplate(form.functionStructure));
        console.log("SubmissionCode", generateSubmissionCode(form.functionStructure));
    }, [form.functionStructure]);

    return (
        <>
            <div className=" basis-[55%] flex flex-col gap-4 px-10 pt-10">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-semibold dark:text-darkText900">
                        Function Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        maxLength={50}
                        value={form.functionStructure.functionName}
                        onChange={e =>
                            setForm({ ...form, functionStructure: { ...form.functionStructure, functionName: e.target.value } })
                        }
                        className="w-[600px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="discription" className="font-semibold dark:text-darkText900">
                        Description ( what function does )
                    </label>
                    <textarea
                        id="discription"
                        value={form.functionStructure.description}
                        onChange={e =>
                            setForm({ ...form, functionStructure: { ...form.functionStructure, description: e.target.value } })
                        }
                        className="bg-transparent h-[100px] border-2 border-light300 dark:border-dark300 rounded-md p-4 outline-none"
                        maxLength={100}
                    ></textarea>
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-right">{form.functionStructure.description.length}/100</div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="hints" className="font-semibold">
                        Function Parameters
                    </label>
                    <div className="flex flex-col gap-2">
                        {form.functionStructure.parameters.map((param, index) => {
                            return (
                                <div className="flex flex-col gap-3 mb-6 mt-3">
                                    <div className="flex gap-6">
                                        <div className="flex flex-col gap-2 text-sm">
                                            <div className="dark:text-light400">Index</div>
                                            <div>{index + 1}</div>
                                        </div>
                                        <div className="flex flex-col gap-2 text-sm">
                                            <label htmlFor="title" className=" dark:text-light400">
                                                Variable Type2
                                            </label>
                                            <CustomDropDown
                                                options={["base", "derived"]}
                                                selectedOption={param.category}
                                                setSelectedOption={category =>
                                                    setForm(form => {
                                                        const newParameters = [...form.functionStructure.parameters];
                                                        newParameters[index] = { ...newParameters[index], category };
                                                        return {
                                                            ...form,
                                                            functionStructure: {
                                                                ...form.functionStructure,
                                                                parameters: newParameters,
                                                            },
                                                        };
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="title" className="dark:text-light400 text-sm">
                                                Base Type
                                            </label>
                                            <BaseTypesDropDown
                                                options={baseTypes}
                                                selectedOption={param.baseType as (typeof baseTypes)[number]}
                                                setSelectedOption={(value: (typeof baseTypes)[number]) => {
                                                    const newParams = [...form.functionStructure.parameters];
                                                    newParams[index].baseType = value;
                                                    setForm({
                                                        ...form,
                                                        functionStructure: {
                                                            ...form.functionStructure,
                                                            parameters: newParams,
                                                        },
                                                    });
                                                }}
                                            />
                                        </div>
                                        {form.functionStructure.parameters[index].category === "derived" && (
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="title" className="dark:text-light400 text-sm">
                                                    Derived Type
                                                </label>
                                                <DerivedTypesDropDown
                                                    options={derivedTypes}
                                                    selectedOption={param.derivedType as (typeof derivedTypes)[number]}
                                                    setSelectedOption={(value: (typeof derivedTypes)[number]) => {
                                                        const newParams = [...form.functionStructure.parameters];
                                                        newParams[index].derivedType = value;
                                                        setForm({
                                                            ...form,
                                                            functionStructure: {
                                                                ...form.functionStructure,
                                                                parameters: newParams,
                                                            },
                                                        });
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="title" className="dark:text-light400 text-sm">
                                                Type Modifire (optional)
                                            </label>
                                            <TypeModifierDropDown
                                                options={typeModifier}
                                                selectedOption={param.typeModifier as (typeof typeModifier)[number]}
                                                setSelectedOption={(value: (typeof typeModifier)[number]) => {
                                                    const newParams = [...form.functionStructure.parameters];
                                                    if (value === "no type modifier") {
                                                        newParams[index].typeModifier = undefined;
                                                    } else {
                                                        newParams[index].typeModifier = value;
                                                    }
                                                    setForm({
                                                        ...form,
                                                        functionStructure: {
                                                            ...form.functionStructure,
                                                            parameters: newParams,
                                                        },
                                                    });
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newParams = [...form.functionStructure.parameters];
                                                newParams.splice(index, 1);
                                                setForm({
                                                    ...form,
                                                    functionStructure: {
                                                        ...form.functionStructure,
                                                        parameters: newParams,
                                                    },
                                                });
                                            }}
                                            title="Delete Parameter"
                                            className="self-start ml-auto text-2xl text-lightText800 hover:text-lightText900 dark:text-darkText900 dark:hover:text-darkText900"
                                        >
                                            <IoIosCloseCircleOutline />
                                        </button>
                                    </div>

                                    <div className="flex pl-[58px] gap-6 w-full">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name" className="dark:text-light400 text-sm">
                                                Parameter Name
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                required
                                                value={form.functionStructure.parameters[index].name}
                                                onChange={e =>
                                                    setForm({
                                                        ...form,
                                                        functionStructure: {
                                                            ...form.functionStructure,
                                                            parameters: form.functionStructure.parameters.map((param, i) =>
                                                                i === index
                                                                    ? {
                                                                          ...param,
                                                                          name: e.target.value,
                                                                      }
                                                                    : param,
                                                            ),
                                                        },
                                                    })
                                                }
                                                className="w-[200px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-2 py-1.5 outline-none"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 w-full">
                                            <label htmlFor="description" className="dark:text-light400 text-sm">
                                                Description
                                            </label>
                                            <input
                                                id="description"
                                                type="text"
                                                value={form.functionStructure.parameters[index].description}
                                                onChange={e =>
                                                    setForm({
                                                        ...form,
                                                        functionStructure: {
                                                            ...form.functionStructure,
                                                            parameters: form.functionStructure.parameters.map((param, i) =>
                                                                i === index
                                                                    ? {
                                                                          ...param,
                                                                          description: e.target.value,
                                                                      }
                                                                    : param,
                                                            ),
                                                        },
                                                    })
                                                }
                                                className="w-full bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-2 py-1.5 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setForm({
                                ...form,
                                functionStructure: {
                                    ...form.functionStructure,
                                    parameters: [
                                        ...form.functionStructure.parameters,
                                        {
                                            name: "",
                                            baseType: "int",
                                            derivedType: undefined,
                                            category: "base",
                                            typeModifier: undefined,
                                            description: "",
                                        },
                                    ],
                                },
                            })
                        }
                        className="self-start pb-10 text-lightText800 hover:text-lightText900 dark:text-darkText900 dark:hover:text-darkText900"
                    >
                        + Add parameter
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="hints" className="font-semibold">
                        Function Return Type
                    </label>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-3 mb-6 mt-3">
                            <div className="flex gap-6">
                                <div className="flex flex-col gap-2 text-sm">
                                    <label htmlFor="title" className=" dark:text-light400">
                                        Variable Type2
                                    </label>
                                    <CustomDropDown
                                        options={["base", "derived"]}
                                        selectedOption={form.functionStructure.returnType.category}
                                        setSelectedOption={category =>
                                            setForm(form => ({
                                                ...form,
                                                functionStructure: {
                                                    ...form.functionStructure,
                                                    returnType: { ...form.functionStructure.returnType, category: category },
                                                },
                                            }))
                                        }
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="title" className="dark:text-light400 text-sm">
                                        Base Type
                                    </label>
                                    <BaseTypesDropDown
                                        options={baseTypes}
                                        selectedOption={form.functionStructure.returnType.baseType as (typeof baseTypes)[number]}
                                        setSelectedOption={(value: (typeof baseTypes)[number]) => {
                                            setForm({
                                                ...form,
                                                functionStructure: {
                                                    ...form.functionStructure,
                                                    returnType: { ...form.functionStructure.returnType, baseType: value },
                                                },
                                            });
                                        }}
                                    />
                                </div>

                                {form.functionStructure.returnType.category === "derived" && (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="title" className="dark:text-light400 text-sm">
                                            Derived Type
                                        </label>
                                        <DerivedTypesDropDown
                                            options={derivedTypes}
                                            selectedOption={
                                                form.functionStructure.returnType.derivedType as (typeof derivedTypes)[number]
                                            }
                                            setSelectedOption={(value: (typeof derivedTypes)[number]) => {
                                                setForm({
                                                    ...form,
                                                    functionStructure: {
                                                        ...form.functionStructure,
                                                        returnType: { ...form.functionStructure.returnType, derivedType: value },
                                                    },
                                                });
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="title" className="dark:text-light400 text-sm">
                                        Type Modifire (optional)
                                    </label>
                                    <TypeModifierDropDown
                                        options={typeModifier}
                                        selectedOption={
                                            form.functionStructure.returnType.typeModifier as (typeof typeModifier)[number]
                                        }
                                        setSelectedOption={(value: (typeof typeModifier)[number]) => {
                                            setForm({
                                                ...form,
                                                functionStructure: {
                                                    ...form.functionStructure,
                                                    returnType: {
                                                        ...form.functionStructure.returnType,
                                                        typeModifier: value === "no type modifier" ? undefined : value,
                                                    },
                                                },
                                            });
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="description" className="dark:text-light400 text-sm">
                                        Description
                                    </label>
                                    <input
                                        id="description"
                                        type="text"
                                        value={form.functionStructure.returnType.description}
                                        onChange={e =>
                                            setForm({
                                                ...form,
                                                functionStructure: {
                                                    ...form.functionStructure,
                                                    returnType: {
                                                        ...form.functionStructure.returnType,
                                                        description: e.target.value,
                                                    },
                                                },
                                            })
                                        }
                                        className="w-[500px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-2 py-1.5 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="basis-[45%] pr-10 py-4">
                <div className="h-[200px] ">
                    <CodeEditor code={generateBoilerplate(form.functionStructure)} title="Boilerplate Code" />
                </div>

                <div className="h-[600px] mt-4">
                    <CodeEditor code={generateSubmissionCode(form.functionStructure)} title="Submission Code" />
                </div>
            </div>
        </>
    );
};
