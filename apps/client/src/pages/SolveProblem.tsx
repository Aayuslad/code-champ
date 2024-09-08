import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContainerSplitter } from "../components/containerSplitter";
import { Navbar02 } from "../components/navbars/navbar02";
import { PorblemPageHeader } from "../components/headers/problemPageHeader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";
import { ProblemType, ProblemStore } from "../stores/problemStore";
import CodeEditor from "../components/codeEditor";

export default function SolveProblem() {
	const problemStore = ProblemStore();
	const [problem, setProblem] = useState<ProblemType>();
	const { id } = useParams();
	const [leftWidth, setLeftWidth] = useState(50);
	const [activeNav1, setActiveNav1] = useState<string>("Problem");
	const [activeNav2, setActiveNav2] = useState<string>("Code");

	// data fetching
	useEffect(() => {
		if (!id) return;
		(async () => {
			const problem = await problemStore.getProblem({ id });
			setProblem(problem);
		})();
	}, [id]);

	return (
		<div className="SolveProblemPage">
			<SideNavbar />

			{problem && (
				<MainWrapper>
					<PorblemPageHeader problemNumber={problem?.problemNumber} title={problem?.title} />

					<div className="w-full h-[calc(100vh-3rem)] flex ">
						{/* Left container */}
						<div
							className="w-[50%] pt-2.5 pb-1.5 px-6 flex flex-col gap-2 overflow-y-auto no-scrollbar"
							style={{ width: `${leftWidth}%` }}
						>
							<Navbar02
								navs={["Problem", "Solution", "Discussion", "Submissions"]}
								currentNav={activeNav1}
								setCurrentNav={setActiveNav1}
							/>

							{activeNav1 === "Problem" && <Problem problem={problem} />}
							{activeNav1 === "Solution" && <div>Solution</div>}
							{activeNav1 === "Discussion" && <div>Discussion</div>}
							{activeNav1 === "Submissions" && <div>Submissions</div>}
						</div>

						{/* Splitter */}
						<ContainerSplitter setLeftWidth={setLeftWidth} />

						{/* Right container */}
						<div className="flex-1 w-[50%] pt-2.5 pb-1.5 px-6 flex flex-col" style={{ width: `${100 - leftWidth}%` }}>
							<Navbar02 navs={["Code", "Test Cases"]} currentNav={activeNav2} setCurrentNav={setActiveNav2} />

							{activeNav2 === "Code" && (
								<div className="flex-1">
									<CodeEditor problemId={problem.id} boilerplateCode={problem.boilerplateCode} />
								</div>
							)}
						</div>
					</div>
				</MainWrapper>
			)}

			{!problem && problemStore.skeletonLoading && "Skeleton loading ..."}
		</div>
	);
}

const Problem = ({ problem }: { problem: ProblemType }) => {
	return (
		<div>
			<h2 className="text-lg font-semibold pt-1 pb-2 -ml-1">Problem Statement</h2>
			<p className="text-justify pb-5">{problem.description}</p>
			{problem.exampleTestCases.map((example, index) => {
				return (
					<div key={index} className="pb-5">
						<h2 className="text-lg font-semibold pt-1 pb-2 -ml-1">Example {index + 1}</h2>

						<div className="border-l-4 border-light300 dark:border-dark300 pl-4">
							<div className="space-x-2 flex">
								<span className="font-medium">Input: </span>
								<span>
									{example.input.map((input, index) => (
										<div key={index}>
											<span>{input.name + " = "}</span>
											<span>{input.value}</span>
										</div>
									))}
								</span>
							</div>
							<div className="space-x-2">
								<span className="font-medium">Output: </span>
								<span>{example.output}</span>
							</div>
							<div className="space-x-2">
								<span className="font-medium">Explanation: </span>
								<span>{example.explanation}</span>
							</div>
						</div>
					</div>
				);
			})}

			<h2 className="text-lg font-semibold pt-1 pb-2 -ml-1">Constraints</h2>
			<ul className="list-disc pl-5 pb-5">
				{problem.constraints.map((constraint, index) => (
					<li key={index} className="text-justify pb-2">
						{constraint.content}
					</li>
				))}
			</ul>
			<h2 className="text-lg font-semibold pt-1 pb-2 -ml-1">Topic Tags</h2>
			<ul className="flex gap-3 pb-5">
				{problem.topicTags.map((tag, index) => {
					return (
						<span key={index} className=" bg-lightTableRow1 text-sm backdrop:blur-md px-2.5 py-0.5 rounded-[100vh]">
							{tag.content}
						</span>
					);
				})}
			</ul>
			<h2 className="text-lg font-semibold pt-1 pb-2 -ml-1">Hints</h2>
			<ul className=" pb-5">
				{problem.hints.map((hint, index) => (
					<li key={index} className="text-justify pb-2 cursor-pointer">
						<details>
							<summary>Hint {index + 1}</summary>
							<p className="py-0.5">{hint.content}</p>
						</details>
					</li>
				))}
			</ul>
			<div className="flex items-center justify-start gap-4 mt-1 mb-4">
				<span className="text-lightText800 dark:text-darkText800 font-semibold">
					Accepted{" "}
					<span className="text-lightText900 dark:text-darkText900 font-normal">{problem.acceptedSubmissions}</span>
				</span>
				<span className="text-2xl text-lightText800 dark:text-darkText800 leading-[1px]">|</span>
				<span className="text-lightText800 dark:text-darkText800 font-semibold">
					Submittions{" "}
					<span className="text-lightText900 dark:text-darkText900 font-normal">{problem.submissionCount}</span>
				</span>
				<span className="text-2xl text-lightText800 dark:text-darkText800 leading-[1px]">|</span>
				<span className="text-lightText800 dark:text-darkText800 font-semibold">
					Acceptance Rate{" "}
					<span className="text-lightText900 dark:text-darkText900 font-normal">{problem.acceptanceRate}</span>
				</span>
			</div>
		</div>
	);
};
