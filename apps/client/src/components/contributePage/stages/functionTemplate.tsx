import { ContributeProblemSchemaType } from "@repo/common/zod";
import { baseTypes, derivedTypes, typeModifier } from "../../../pages/Contribute";
import BaseTypesDropDown from "../inputs/baseTypesDropDown";
import CustomDropDown from "../inputs/customDropDown";
import DerivedTypesDropDown from "../inputs/derivedTypesDropDown";
import TypeModifierDropDown from "../inputs/typeModifireDropDown";
import { generateBoilerplate } from "../../../utils/boilerplateGenerator/boilerplateGenerator";
import { generateSubmissionCode } from "../../../utils/boilerplateGenerator/submissionCodeGenerator";
import CodeEditor from "../codeEditor";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoInformationCircle } from "react-icons/io5";
import { useEffect } from "react";

type Props = {
    form: ContributeProblemSchemaType;
    setForm: React.Dispatch<React.SetStateAction<ContributeProblemSchemaType>>;
};

export const FunctionTemplate = ({ form, setForm }: Props) => {
    useEffect(() => {
        const boilerplate = generateBoilerplate(form.functionStructure);
        const submissionCode = generateSubmissionCode(form.functionStructure);
        setForm(prevForm => ({
            ...prevForm,
            boilerplateCode: JSON.stringify(boilerplate),
            submissionCode: JSON.stringify(submissionCode),
        }));
    }, []);

    useEffect(() => {
        const boilerplate = generateBoilerplate(form.functionStructure);
        const submissionCode = generateSubmissionCode(form.functionStructure);
        setForm(prevForm => ({
            ...prevForm,
            boilerplateCode: JSON.stringify(boilerplate),
            submissionCode: JSON.stringify(submissionCode),
        }));
    }, [form.functionStructure]);

    const handleParameterChange = (index: number, field: string, value: any) => {
        setForm(prevForm => ({
            ...prevForm,
            functionStructure: {
                ...prevForm.functionStructure,
                parameters: prevForm.functionStructure.parameters.map((param, i) =>
                    i === index ? { ...param, [field]: value } : param,
                ),
            },
        }));
    };

    const handleReturnTypeChange = (field: string, value: any) => {
        setForm(prevForm => ({
            ...prevForm,
            functionStructure: {
                ...prevForm.functionStructure,
                returnType: { ...prevForm.functionStructure.returnType, [field]: value },
            },
        }));
    };

    const addParameter = () => {
        setForm(prevForm => ({
            ...prevForm,
            functionStructure: {
                ...prevForm.functionStructure,
                parameters: [
                    ...prevForm.functionStructure.parameters,
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
        }));
    };

    const removeParameter = (index: number) => {
        setForm(prevForm => ({
            ...prevForm,
            functionStructure: {
                ...prevForm.functionStructure,
                parameters: prevForm.functionStructure.parameters.filter((_, i) => i !== index),
            },
        }));
    };

    const handleConstraintChange = (index: number, value: string) => {
        setForm(prevForm => ({
            ...prevForm,
            constraints: prevForm.constraints.map((constraint, i) => (i === index ? value : constraint)),
        }));
    };

    const handleAddConstraint = () => {
        setForm(prevForm => ({
            ...prevForm,
            constraints: [...prevForm.constraints, ""],
        }));
    };

    const handleRemoveConstraint = (index: number) => {
        setForm(prevForm => ({
            ...prevForm,
            constraints: prevForm.constraints.filter((_, i) => i !== index),
        }));
    };

    return (
        <>
            <div className="basis-[55%] flex flex-col gap-4 px-10 pt-10">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-semibold dark:text-darkText900 flex items-center">
                        Function Name *
                        <IoInformationCircle
                            className="ml-1 cursor-help"
                            title="Give a function name that does not conflict with keywords and explains the meaning of the function"
                        />
                    </label>
                    <input
                        id="name"
                        type="text"
                        required
                        maxLength={50}
                        value={form.functionStructure.functionName}
                        onChange={e =>
                            setForm(prevForm => ({
                                ...prevForm,
                                functionStructure: { ...prevForm.functionStructure, functionName: e.target.value },
                            }))
                        }
                        className="w-[600px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="font-semibold dark:text-darkText900 flex items-center">
                        Description (what function does) *
                        <IoInformationCircle
                            className="ml-1 cursor-help"
                            title="Clearly explain what the function does in a concise and accurate manner."
                        />
                    </label>
                    <textarea
                        id="description"
                        required
                        value={form.functionStructure.description}
                        onChange={e =>
                            setForm(prevForm => ({
                                ...prevForm,
                                functionStructure: { ...prevForm.functionStructure, description: e.target.value },
                            }))
                        }
                        className="bg-transparent h-[100px] border-2 border-light300 dark:border-dark300 rounded-md p-4 outline-none"
                        maxLength={100}
                    ></textarea>
                    <div className="text-sm text-gray-500 dark:text-gray-400 text-right">
                        {form.functionStructure.description.length}/100
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="parameters" className="font-semibold flex items-center">
                        Function Parameters *
                        <IoInformationCircle
                            className="ml-1 cursor-help"
                            title="add nessasary parameters for the function using right data type"
                        />
                    </label>
                    <div className="flex flex-col gap-2">
                        {form.functionStructure.parameters.map((param, index) => (
                            <div key={index} className="flex flex-col gap-3 mb-6 mt-3">
                                <div className="flex gap-6">
                                    <div className="flex flex-col gap-2 text-sm">
                                        <div className="dark:text-light400">Index</div>
                                        <div>{index + 1}</div>
                                    </div>
                                    <div className="flex flex-col gap-2 text-sm">
                                        <label htmlFor={`category-${index}`} className="dark:text-light400">
                                            Variable Type *
                                        </label>
                                        <CustomDropDown
                                            options={["base", "derived"]}
                                            selectedOption={param.category}
                                            setSelectedOption={value => handleParameterChange(index, "category", value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={`baseType-${index}`} className="dark:text-light400 text-sm">
                                            Base Type *
                                        </label>
                                        <BaseTypesDropDown
                                            options={baseTypes}
                                            selectedOption={param.baseType as (typeof baseTypes)[number]}
                                            setSelectedOption={value => handleParameterChange(index, "baseType", value)}
                                        />
                                    </div>
                                    {param.category === "derived" && (
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor={`derivedType-${index}`} className="dark:text-light400 text-sm">
                                                Derived Type *
                                            </label>
                                            <DerivedTypesDropDown
                                                options={derivedTypes}
                                                selectedOption={param.derivedType as (typeof derivedTypes)[number]}
                                                setSelectedOption={value => handleParameterChange(index, "derivedType", value)}
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={`typeModifier-${index}`} className="dark:text-light400 text-sm">
                                            Type Modifier (optional)
                                        </label>
                                        <TypeModifierDropDown
                                            options={typeModifier}
                                            selectedOption={param.typeModifier as (typeof typeModifier)[number]}
                                            setSelectedOption={value =>
                                                handleParameterChange(
                                                    index,
                                                    "typeModifier",
                                                    value === "no type modifier" ? undefined : value,
                                                )
                                            }
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeParameter(index)}
                                        title="Delete Parameter"
                                        className="self-start ml-auto text-2xl text-lightText800 hover:text-lightText900 dark:text-darkText900 dark:hover:text-darkText900"
                                    >
                                        <IoIosCloseCircleOutline />
                                    </button>
                                </div>

                                <div className="flex pl-[58px] gap-6 w-full">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor={`paramName-${index}`} className="dark:text-light400 text-sm">
                                            Parameter Name *
                                        </label>
                                        <input
                                            id={`paramName-${index}`}
                                            type="text"
                                            required
                                            value={param.name}
                                            onChange={e => handleParameterChange(index, "name", e.target.value)}
                                            className="w-[200px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-2 py-1.5 outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <label htmlFor={`paramDescription-${index}`} className="dark:text-light400 text-sm">
                                            Description
                                        </label>
                                        <input
                                            id={`paramDescription-${index}`}
                                            type="text"
                                            value={param.description}
                                            onChange={e => handleParameterChange(index, "description", e.target.value)}
                                            className="w-full bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-2 py-1.5 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addParameter}
                        className="self-start pb-10 text-lightText800 hover:text-lightText900 dark:text-darkText900 dark:hover:text-darkText900"
                    >
                        + Add parameter
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="returnType" className="font-semibold flex items-center">
                        Function Return Type *
                        <IoInformationCircle className="ml-1 cursor-help" title="The type of value the function returns" />
                    </label>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-3 mb-6 mt-3">
                            <div className="flex gap-6">
                                <div className="flex flex-col gap-2 text-sm">
                                    <label htmlFor="returnCategory" className="dark:text-light400">
                                        Variable Type *
                                    </label>
                                    <CustomDropDown
                                        options={["base", "derived"]}
                                        selectedOption={form.functionStructure.returnType.category}
                                        setSelectedOption={value => handleReturnTypeChange("category", value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="returnBaseType" className="dark:text-light400 text-sm">
                                        Base Type *
                                    </label>
                                    <BaseTypesDropDown
                                        options={baseTypes}
                                        selectedOption={form.functionStructure.returnType.baseType as (typeof baseTypes)[number]}
                                        setSelectedOption={value => handleReturnTypeChange("baseType", value)}
                                    />
                                </div>

                                {form.functionStructure.returnType.category === "derived" && (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="returnDerivedType" className="dark:text-light400 text-sm">
                                            Derived Type *
                                        </label>
                                        <DerivedTypesDropDown
                                            options={derivedTypes}
                                            selectedOption={
                                                form.functionStructure.returnType.derivedType as (typeof derivedTypes)[number]
                                            }
                                            setSelectedOption={value => handleReturnTypeChange("derivedType", value)}
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="returnTypeModifier" className="dark:text-light400 text-sm">
                                        Type Modifier (optional)
                                    </label>
                                    <TypeModifierDropDown
                                        options={typeModifier}
                                        selectedOption={
                                            form.functionStructure.returnType.typeModifier as (typeof typeModifier)[number]
                                        }
                                        setSelectedOption={value =>
                                            handleReturnTypeChange(
                                                "typeModifier",
                                                value === "no type modifier" ? undefined : value,
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="returnDescription" className="dark:text-light400 text-sm">
                                        Description
                                    </label>
                                    <input
                                        id="returnDescription"
                                        type="text"
                                        value={form.functionStructure.returnType.description}
                                        onChange={e => handleReturnTypeChange("description", e.target.value)}
                                        className="w-[500px] bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-2 py-1.5 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="constraints" className="font-semibold">
                            Constraints
                        </label>
                        <div className="flex flex-col gap-2">
                            {form.constraints.map((constraint, index) => (
                                <div key={index} className="flex items-center gap-2 w-[600px]">
                                    <input
                                        type="text"
                                        value={constraint}
                                        onChange={e => handleConstraintChange(index, e.target.value)}
                                        className="flex-grow bg-transparent border-2 border-light300 dark:border-dark300 rounded-md px-3 py-2 outline-none"
                                        placeholder={`Constraint ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveConstraint(index)}
                                        className="text-2xl text-lightText800 hover:text-lightText900 dark:text-darkText900 dark:hover:text-darkText900"
                                    >
                                        <IoIosCloseCircleOutline />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {form.constraints.length < 3 && (
                            <button
                                type="button"
                                onClick={handleAddConstraint}
                                className="self-start text-lightText800 hover:text-lightText900 dark:text-darkText900 dark:hover:text-darkText900"
                            >
                                + Add a constraint
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="basis-[45%] pr-10 py-4">
                <div className="text-lightText800 dark:text-darkText800">
                    <p className="text-sm text-justify">
                        <strong className="block mb-2">Instruction: </strong>The boilerplate code is a template function that
                        provides a basic structure for solving the problem. User'll need to complete the function with his/her own
                        implementation to create a working solution.
                    </p>
                </div>
                <div className="h-[200px] mb-4">
                    <CodeEditor form={form} setForm={setForm} title="Boilerplate Code" />
                </div>

                <div className="text-lightText800 dark:text-darkText800">
                    <p className="text-sm text-justify">
                        <strong className="block mb-2">Instruction: </strong>Submission code encapsulates your function and tests
                        it against various input cases. After completing the form, make sure to test the submission code with your
                        implemented solution function to verify its correctness. If there are errors in the auto-generated code,
                        make the necessary changes to ensure it works as expected or you can leav it on us.
                    </p>
                </div>
                <div className="h-[600px]">
                    <CodeEditor form={form} setForm={setForm} title="Submission Code" />
                </div>
            </div>
        </>
    );
};
