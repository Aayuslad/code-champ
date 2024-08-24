export const templates = {
	python: "def {function_name}({params}) -> {output_type}:\n    # Your code here\n    pass",
	javascript: "function {function_name}({params}): {output_type} {\n    // Your code here\n}",
	java: "public {output_type} {function_name}({params}) {\n    // Your code here\n}",
	cpp: "{output_type} {function_name}({params}) {\n    // Your code here\n}",
	csharp: "public {output_type} {function_name}({params}) {\n    // Your code here\n}",
	go: "func {function_name}({params}) {output_type} {\n    // Your code here\n}",
	ruby: "def {function_name}({params})\n    # Your code here\nend",
	typescript: "function {function_name}({params}): {output_type} {\n    // Your code here\n}",
	c: "{output_type} {function_name}({params}) {\n    // Your code here\n}",
};
