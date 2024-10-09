import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { UiStore } from "../../stores/uiStore";
import CustomDropDown from "./inputs/customDropDown";
import { ContributeProblemSchemaType } from "@repo/common/zod";

type Props = {
    title: string;
    form: ContributeProblemSchemaType;
    setForm: React.Dispatch<React.SetStateAction<ContributeProblemSchemaType>>;
};

export default function CodeEditor({ title, form, setForm }: Props) {
    const uiStore = UiStore();
    const [language, setLanguage] = useState<"cpp" | "python3" | "c" | "java">("cpp");
    const [code, setCode] = useState<{
        c: string;
        cpp: string;
        java: string;
        python3: string;
    }>();

    useEffect(() => {
        if (title === "Boilerplate Code" && form.boilerplateCode) {
            const code = JSON.parse(form.boilerplateCode);
            setCode(code);
        }
        if (title === "Submission Code" && form.submissionCode) {
            const code = JSON.parse(form.submissionCode);
            setCode(code);
        }
    }, [form.functionStructure, form.boilerplateCode, form.submissionCode]);

    const handleOnChange = (code: string | undefined) => {
        if (title === "Boilerplate Code") {
            setForm(prevForm => ({
                ...prevForm,
                boilerplateCode: JSON.stringify({ ...JSON.parse(prevForm.boilerplateCode), [language]: code }),
            }));
        }
        if (title === "Submission Code") {
            setForm(prevForm => ({
                ...prevForm,
                submissionCode: JSON.stringify({ ...JSON.parse(prevForm.submissionCode), [language]: code }),
            }));
        }
    };

    return (
        <div className="h-full border-green-700">
            {language && code && (
                <div className="h-[calc(100%)] overflow-hidden">
                    <div className="h-14 flex items-center justify-between">
                        <div className="font-semibold">{title}</div>
                        <CustomDropDown
                            options={["cpp", "python3", "c", "java"]}
                            selectedOption={language}
                            setSelectedOption={option => setLanguage(option as "cpp" | "python3" | "c" | "java")}
                        />
                    </div>

                    <Editor
                        height="100%"
                        width={`${uiStore.sideBarToggle ? "calc(100% - 1vw)" : "100%"}`}
                        className="rounded-lg z-0"
                        theme={uiStore.theme === "dark" ? "vs-dark" : "hc-light"}
                        language={language === "python3" ? "python" : language}
                        value={code[language]}
                        onChange={code => handleOnChange(code)}
                        options={{
                            padding: {
                                top: 8,
                                bottom: 8,
                            },
                            inlineSuggest: { enabled: true },
                            fontSize: 16,
                            formatOnType: true,
                            autoClosingBrackets: "always",
                            minimap: { enabled: false },
                            lineNumbersMinChars: 2,
                            glyphMargin: false,
                            overviewRulerLanes: 0,
                        }}
                    />
                </div>
            )}
        </div>
    );
}
