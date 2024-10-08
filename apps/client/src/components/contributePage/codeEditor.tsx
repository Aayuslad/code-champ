import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { UiStore } from "../../stores/uiStore";
import CustomDropDown from "./inputs/customDropDown";

type Props = {
    title: string;
    code: {
        c: string;
        cpp: string;
        java: string;
        python3: string;
    };
};

export default function CodeEditor({ code, title }: Props) {
    const uiStore = UiStore();
    const [language, setLanguage] = useState<"cpp" | "python3" | "c" | "java">("cpp");

    useEffect(() => {}, []);

    const handleOnChange = (code: string | undefined) => {};

    return (
        <div className="h-full border-green-700">
            {language && (
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
