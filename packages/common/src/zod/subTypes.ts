import zod from "zod";

export const baseTypesChama = zod.enum(["int", "short", "long", "float", "double", "boolean", "char", "String", "void"]);
export const derivedTypesChama = zod.enum(["Array", "LinkedList", "Set", "Map", "Queue", "Stack", "TreeNode", "GraphNode"]);
export const typeModifiersSchema = zod.enum(["unsigned", "short", "long", "longLong", "const", "volatile"]);
export type BaseTypes = zod.infer<typeof baseTypesChama>;
export type DerivedTypes = zod.infer<typeof derivedTypesChama>;
export type TypeModifiers = zod.infer<typeof typeModifiersSchema>;

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
            typeModifier: typeModifiersSchema.optional(),
            description: zod.string(),
        }),
    ),
    returnType: zod.object({
        baseType: baseTypesChama,
        derivedType: derivedTypesChama.optional(),
        category: zod.string(),
        typeModifier: typeModifiersSchema.optional(),
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
