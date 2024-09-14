import zod from "zod";

// export type BaseType = "int" | "short" | "long" | "float" | "double" | "boolean";
// export type DerivedType = "String" | "Array" | "LinkedList" | "Set" | "Map" | "Queue" | "Stack" | "TreeNode" | "GraphNode";

export const baseTypesChama = zod.enum(["int", "short", "long", "float", "double", "boolean"]);
export const derivedTypesChama = zod.enum([
	"String",
	"Array",
	"LinkedList",
	"Set",
	"Map",
	"Queue",
	"Stack",
	"TreeNode",
	"GraphNode",
]);
export type BaseTypes = zod.infer<typeof baseTypesChama>;
export type DerivedTypes = zod.infer<typeof derivedTypesChama>;

export const functionStructureSchema = zod.object({
	title: zod.string(),
	functionName: zod.string(),
	description: zod.string(),
	parameters: zod.array(
		zod.object({
			name: zod.string(),
			baseType: baseTypesChama,
			derivedType: derivedTypesChama.optional(),
			category: zod.string(),
			description: zod.string(),
		}),
	),
	returnType: zod.object({
		baseType: baseTypesChama,
		derivedType: derivedTypesChama.optional(),
		category: zod.string(),
		description: zod.string(),
	}),
});
export type FunctionStructureType = zod.infer<typeof functionStructureSchema>;

export const testCaseSchema = zod.object({
	input: zod.array(
		zod.object({
			value: zod.string(),
			name: zod.string(),
		}),
	),
	output: zod.string(),
	explanation: zod.string().optional(),
});	

export type TestCaseType = zod.infer<typeof testCaseSchema>;

export type BoilerPlateCode = {
    c: string;
    cpp: string;
    python3: string;
    java: string;
};