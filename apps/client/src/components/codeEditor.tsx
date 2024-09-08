import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { boilerplateCode, ProblemStore } from "../stores/problemStore";
import { UiStore } from "../stores/uiStore";
import CustomDropdown2 from "./inputs/CustomDropDown2";
import { languageIdMppings } from "../config/languageIdMppings";

interface props {
	problemId: string;
	boilerplateCode: boilerplateCode;
}

export default function CodeEditor({ problemId, boilerplateCode }: props) {
	const uiStore = UiStore();
	const problemStore = ProblemStore();
	const [language, setLanguage] = useState<string>("cpp");
	const languages = ["c", "cpp", "python3", "java"];

	// UseEffect to initialize the problem if it doesn't exist
	useEffect(() => {
		const existingProblem = problemStore.onGoingProblems[problemId]?.[language];

		if (!existingProblem) {
			problemStore.setOnGoingPrblem({
				problemId,
				language,
				solutionCode: boilerplateCode[language as keyof typeof boilerplateCode],
			});
		}
	}, [problemId, language, problemStore, boilerplateCode]);

	const solutionCode = problemStore.onGoingProblems[problemId]?.[language]?.solutionCode || "";
	const theme = uiStore.theme === "dark" ? "vs-dark" : "hc-light";

	return (
		<div className="h-[92%] mt-3">
			<div className="h-[100%] rounded-lg overflow-hidden">
				<Editor
					height="100%"
					language={language === "python3" ? "python" : language}
					theme={theme}
					value={solutionCode}
					onChange={(code) => {
						problemStore.setOnGoingPrblem({
							problemId,
							solutionCode: code || "",
							language,
						});
					}}
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

			<div className="flex items-end justify-between pt-2">
				<button
					type="button"
					className="bg-red-600 py-1 px-3"
					disabled={!solutionCode && problemStore.skeletonLoading}
					onClick={() =>
						problemStore.submitProblem({
							problemId,
							languageId: languageIdMppings[language as keyof typeof languageIdMppings],
							solutionCode,
						})
					}
				>
					Submit
				</button>
				<CustomDropdown2
					minWidth={"100px"}
					options={languages}
					selectedOption={language}
					setSelectedOption={setLanguage}
				/>
			</div>
		</div>
	);
}
