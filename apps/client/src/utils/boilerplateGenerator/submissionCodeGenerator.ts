import { FunctionStructureType } from "@repo/common/zod";
import { baseTypes } from "./baseTypes";
import { derivedTypes } from "./derivedTypes";
import { cFormatSpecifiers, typeModifiers } from "./typeModifires";

export function generateSubmissionCode(structure: FunctionStructureType) {
    return {
        c: generateCSubmissionCode(structure),
        cpp: generateCppSubmissionCode(structure),
        java: generateJavaSubmissionCode(structure),
        python3: generatePython3SubmissionCode(structure),
    };
}

const generateCSubmissionCode = (structure: FunctionStructureType) => {
    let submissionCode = `#include <stdio.h>      // For input and output functions
#include <stdlib.h>     // For memory allocation and other utility functions
#include <string.h>     // For string manipulation functions
#include <math.h>       // For mathematical functions (e.g., pow, sqrt)
#include <limits.h>     // For constants like INT_MAX, INT_MIN
#include <stdbool.h>    // For using boolean type (true/false)
#include <ctype.h>      // For character type functions (e.g., isdigit, isalpha)

{solution_code}

int main() {
	{decl_init}

	{ret_type} result = {func_name}({args});

	{print_result}

	return 0;
}`;

    // adding variable declaration and initialization for function parameters
    const declInit = structure.parameters
        .map(p => {
            let bType = baseTypes[p.baseType].c;
            if (p.category === "derived" && p.derivedType) {
                const dType = derivedTypes[p.derivedType].c;
                let type = dType.replace("base_type", bType);

                if (p.derivedType.includes("Array")) {
                    const sizeDecl = `int ${p.name}_size;`;
                    const sizeInit = `scanf("%d", &${p.name}_size);`;
                    if (p.typeModifier) {
                        bType = `${typeModifiers[p.typeModifier].c} ${bType}`;
                        type = dType.replace("base_type", bType);
                    }

                    if (p.baseType === "String") {
                        const arrDecl = `char** ${p.name} = malloc(${p.name}_size * sizeof(char*));`;
                        const arrInit = `
    for (int i = 0; i < ${p.name}_size; i++) {
        ${p.name}[i] = NULL;
        size_t len = 0;
        ssize_t read;
        read = getline(&${p.name}[i], &len, stdin);
        if (read != -1) {
            if (${p.name}[i][read - 1] == '\\n') {
                ${p.name}[i][read - 1] = '\\0';
            }
        }
    }`;
                        return `${sizeDecl}\n\t${sizeInit}\n\t${arrDecl}\n\t${arrInit}`;
                    } else {
                        const arrDecl = `${type} ${p.name} = malloc(${p.name}_size * sizeof(${bType}));`;
                        const arrInit = `for (int i = 0; i < ${p.name}_size; i++) {\n\t\tscanf("${cFormatSpecifiers[bType]}", &${p.name}[i]);\n\t}`;
                        return `${sizeDecl}\n\t${sizeInit}\n\t${arrDecl}\n\t${arrInit}`;
                    }
                } else {
                    if (p.typeModifier) {
                        bType = `${typeModifiers[p.typeModifier].c} ${bType}`;
                    }
                    return `${type} ${p.name};\nscanf("${cFormatSpecifiers[bType]}", &${p.name});`;
                }
            } else {
                if (p.typeModifier) {
                    bType = `${typeModifiers[p.typeModifier].c} ${bType}`;
                }

                if (p.baseType === "String") {
                    return `char *${p.name} = NULL;
    size_t ${p.name}_size = 0;
    int ${p.name}_ch;
    while ((${p.name}_ch = getchar()) != '\\n' && ${p.name}_ch != EOF) {
        ${p.name} = realloc(${p.name}, ${p.name}_size + 2);
        if (${p.name} == NULL) {
            perror("Unable to allocate memory");
            exit(EXIT_FAILURE);
        }
        ${p.name}[${p.name}_size++] = ${p.name}_ch;
    }
    ${p.name}[${p.name}_size] = '\\0';`;
                }

                if (p.baseType === "boolean") {
                    return `bool ${p.name};\n\tscanf("%d", &${p.name});`;
                }

                return `${bType} ${p.name};\n\tscanf("${cFormatSpecifiers[bType]}", &${p.name});`;
            }
        })
        .join("\n\n\t");

    submissionCode = submissionCode.replace("{decl_init}", declInit);

    // adding function call
    const returnStrArraySize =
        structure.returnType.baseType === "String" && structure.returnType.derivedType === "Array"
            ? "int return_array_size;\n\t"
            : "";

    const retType =
        structure.returnType.category === "derived" && structure.returnType.derivedType
            ? derivedTypes[structure.returnType.derivedType].c.replace("base_type", baseTypes[structure.returnType.baseType].c)
            : baseTypes[structure.returnType.baseType].c;

    const finalRetType = structure.returnType.typeModifier
        ? `${typeModifiers[structure.returnType.typeModifier].c} ${retType}`
        : retType;

    if (structure.returnType.baseType === "void") {
        submissionCode = submissionCode.replace("{ret_type} result = ", "");
    } else {
        submissionCode = submissionCode.replace("{ret_type}", `${returnStrArraySize}${finalRetType}`);
    }

    submissionCode = submissionCode.replace("{func_name}", structure.functionName);
    if (structure.returnType.baseType === "String" && structure.returnType.derivedType === "Array") {
        submissionCode = submissionCode.replace(
            "{args}",
            `${structure.parameters
                .map(p => {
                    if (p.derivedType === "Array") {
                        return `${p.name}, ${p.name}_size`;
                    }
                    return p.name;
                })
                .join(", ")}, &return_array_size`,
        );
    } else {
        submissionCode = submissionCode.replace(
            "{args}",
            structure.parameters
                .map(p => {
                    if (p.derivedType === "Array") {
                        return `${p.name}, ${p.name}_size`;
                    }
                    return p.name;
                })
                .join(", "),
        );
    }

    // printing result
    if (structure.returnType.category === "base" && structure.returnType.baseType) {
        let bType = baseTypes[structure.returnType.baseType].c;
        if (structure.returnType.typeModifier) {
            bType = `${typeModifiers[structure.returnType.typeModifier].c} ${bType}`;
        }

        if (structure.returnType.baseType === "String") {
            submissionCode = submissionCode.replace("{print_result}", `printf("%s", result);`);
        } else if (structure.returnType.baseType === "boolean") {
            submissionCode = submissionCode.replace("{print_result}", `printf("%d", result);`);
        } else if (structure.returnType.baseType === "void") {
            submissionCode = submissionCode.replace("{print_result}", ``);
        } else {
            submissionCode = submissionCode.replace("{print_result}", `printf("${cFormatSpecifiers[bType]}", result);`);
        }
    } else {
        let printResult = "";

        if (structure.returnType.derivedType == "Array") {
            let bType = baseTypes[structure.returnType.baseType].c;
            if (structure.returnType.typeModifier) {
                bType = `${typeModifiers[structure.returnType.typeModifier].c} ${bType}`;
            }

            if (structure.returnType.baseType === "String") {
                printResult = `for (int i = 0; i < return_array_size; i++) {\n\t\tprintf("%s ", result[i]);\n\t}`;
            } else {
                printResult = `for (int i = 0; i < sizeof(result) / sizeof(result[0]); i++) {\n\t\tprintf("${cFormatSpecifiers[bType]} ", result[i]);\n\t}\n\tprintf("\\n");`;
            }
        } else {
            printResult = `
			printf("%d\\n", result);
			`;
        }

        submissionCode = submissionCode.replace("{print_result}", printResult);
    }

    return submissionCode;
};

const generateCppSubmissionCode = (structure: FunctionStructureType) => {
    let submissionCode = `#include <iostream>       // For basic I/O
#include <vector>         // For using vectors
#include <algorithm>      // For functions like min, max, sort, etc.
#include <cmath>          // For mathematical operations
#include <queue>          // For using priority queues, queues
#include <stack>          // For using stacks
#include <set>            // For ordered/unordered sets
#include <map>            // For ordered/unordered maps
#include <unordered_map>  // For using hashmaps
#include <climits>        // For constant values like INT_MAX, INT_MIN
using namespace std;

{solution_code}

int main() {
	{decl_init}

	{ret_type} result = {func_name}({args});

	{print_result}

	return 0;
}`;

    // adding varible declaration and initialization for function parameters
    const declInit = structure.parameters
        .map(p => {
            let bType = baseTypes[p.baseType].cpp;
            if (p.category === "derived" && p.derivedType) {
                const dType = derivedTypes[p.derivedType].cpp;
                let type = dType.replace("base_type", bType);

                if (p.derivedType.includes("Array")) {
                    const sizeDecl = `int ${p.name}_size;`;
                    const sizeInit = `cin >> ${p.name}_size;`;
                    if (p.typeModifier) {
                        type = `${typeModifiers[p.typeModifier].cpp} ${bType}`;
                    }
                    const arrDecl = `${type} ${p.name}(${p.name}_size);`;
                    const arrInit = `for (int i = 0; i < ${p.name}_size; i++) {\n\t\tcin >> ${p.name}[i];\n\t}`;

                    return `${sizeDecl}\n\t${sizeInit}\n\t${arrDecl}\n\t${arrInit}`;
                } else {
                    if (p.typeModifier) {
                        bType = `${typeModifiers[p.typeModifier].cpp} ${bType}`;
                    }
                    return `${type} ${p.name};\n\tcin >> ${p.name};`;
                }
            } else {
                if (p.typeModifier) {
                    bType = `${typeModifiers[p.typeModifier].cpp} ${bType}`;
                }
                return `${bType} ${p.name};\n\tcin >> ${p.name};`;
            }
        })
        .join("\n\n\t");

    submissionCode = submissionCode.replace("{decl_init}", declInit);

    // function call
    const retType =
        structure.returnType.category === "derived" && structure.returnType.derivedType
            ? derivedTypes[structure.returnType.derivedType].cpp.replace(
                  "base_type",
                  baseTypes[structure.returnType.baseType].cpp,
              )
            : baseTypes[structure.returnType.baseType].cpp;

    const finalRetType = structure.returnType.typeModifier
        ? `${typeModifiers[structure.returnType.typeModifier].cpp} ${retType}`
        : retType;

    if (structure.returnType.baseType === "void") {
        submissionCode = submissionCode.replace("{ret_type} result = ", "");
    } else {
        submissionCode = submissionCode.replace("{ret_type}", finalRetType);
    }
    submissionCode = submissionCode.replace("{func_name}", structure.functionName);
    submissionCode = submissionCode.replace("{args}", structure.parameters.map(p => p.name).join(", "));

    // printing result
    if (structure.returnType.category === "base" && structure.returnType.baseType) {
        if (structure.returnType.baseType === "void") {
            submissionCode = submissionCode.replace("{print_result}", "");
        }
        submissionCode = submissionCode.replace("{print_result}", "cout << result;");
    } else {
        let printResult = "";

        if (structure.returnType.derivedType == "Array") {
            printResult = `for (int i = 0; i < result.size(); i++) {\n\t\tcout << result[i] << " ";\n\t}\n\tcout << endl;`;
        } else {
            printResult = `cout << result << endl;`;
        }

        submissionCode = submissionCode.replace("{print_result}", printResult);
    }

    return submissionCode;
};

const generatePython3SubmissionCode = (structure: FunctionStructureType) => {
    let submissionCode = `from typing import List, Tuple, Dict, Any  # For type hinting
import sys  # For system-specific parameters and functions
import math  # For mathematical functions
from collections import defaultdict, deque  # For data structures
import itertools  # For advanced iteration tools
import heapq  # For priority queues
import bisect  # For maintaining a list in sorted order

{solution_code}

if __name__ == "__main__":
    {decl_init}
    
    result = {func_name}({args})

    {print_result}
`;

    // adding variable declaration and initialization for function parameters
    const declInit = structure.parameters
        .map(p => {
            const bType = baseTypes[p.baseType].python3;
            if (p.category === "derived" && p.derivedType) {
                const dType = derivedTypes[p.derivedType].python3;
                const type = dType.replace("base_type", bType);

                if (p.derivedType.includes("Array")) {
                    return `${p.name}_size = int(input())\n\t${p.name} = []\n\tfor _ in range(${p.name}_size):\n\t\t${p.name}.append(int(input()))`;
                } else {
                    return `${p.name} = ${type}(input())`;
                }
            } else {
                if (p.baseType == "boolean") {
                    return `${p.name} = bool(int(input().strip()))`;
                }

                return `${p.name} = ${bType}(input())`;
            }
        })
        .join("\n\n\t");

    submissionCode = submissionCode.replace("{decl_init}", declInit);

    if (structure.returnType.baseType === "void") {
        submissionCode = submissionCode.replace("result = ", "");
    }

    submissionCode = submissionCode.replace("{func_name}", structure.functionName);
    submissionCode = submissionCode.replace("{args}", structure.parameters.map(p => p.name).join(", "));
    if (structure.returnType.category === "base" && structure.returnType.baseType) {
        if (structure.returnType.baseType == "boolean") {
            submissionCode = submissionCode.replace("{print_result}", `print(int(result), end="")`);
        } else if (structure.returnType.baseType == "void") {
            submissionCode = submissionCode.replace("{print_result}", "");
        } else {
            submissionCode = submissionCode.replace("{print_result}", `print(result, end="")`);
        }
    } else {
        let printResult = "";

        if (structure.returnType.derivedType == "Array") {
            printResult = `print(' '.join(map(str, result)))`;
        } else {
            printResult = `print(result)`;
        }

        submissionCode = submissionCode.replace("{print_result}", printResult);
    }

    return submissionCode;
};

const generateJavaSubmissionCode = (structure: FunctionStructureType) => {
    let submissionCode = `import java.util.*;      // For data structures like ArrayList, HashMap, etc.
import java.io.*;        // For input and output operations
import java.math.*;      // For mathematical functions and constants
import java.util.stream.*; // For Java Streams API (if needed for functional-style operations)

public class Solution {
	{solution_code}

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		{decl_init}

		{ret_type} result = {func_name}({args});

		{print_result}

		scanner.close();
	}
}`;

    // adding variable declaration and initialization for function parameters
    const declInit = structure.parameters
        .map(p => {
            let bType = baseTypes[p.baseType].java;
            if (p.category === "derived" && p.derivedType) {
                let dType = derivedTypes[p.derivedType].java;
                if (p.typeModifier) {
                    const typeModifier = typeModifiers[p.typeModifier].java;
                    if (typeModifier === "sort" || typeModifier === "long" || typeModifier === "BigInteger") {
                        bType = typeModifier;
                    } else {
                        bType = `${typeModifier} ${bType}`;
                    }
                    bType = `${typeModifier} ${bType}`;
                }
                let type = dType.replace("base_type", bType);

                if (p.derivedType.includes("Array")) {
                    let sizeDecl = "";
                    if (p.baseType === "String") {
                        sizeDecl = `int ${p.name}Size = scanner.nextInt();\n\t\tscanner.nextLine();\n`;
                    } else {
                        sizeDecl = `int ${p.name}Size = scanner.nextInt();`;
                    }
                    const arrDecl = `${type} ${p.name} = new ${bType}[${p.name}Size];`;
                    if (p.typeModifier) {
                        const typeModifier = typeModifiers[p.typeModifier].java;

                        if (typeModifier === "BigInteger") {
                            const arrInit = `for (int i = 0; i < ${p.name}Size; i++) { ${p.name}[i] = new BigInteger(scanner.next()); }`;
                            return `${sizeDecl}\n\t\t${arrDecl}\n\t\t${arrInit}`;
                        }
                        const arrInit = `for (int i = 0; i < ${p.name}Size; i++) {\n\t\t\t${p.name}[i] = scanner.next${bType.charAt(0).toUpperCase() + bType.slice(1)}();\n\t\t}`;
                        console.log(`${sizeDecl}\n\t\t${arrDecl}\n\t\t${arrInit}`);
                        return `${sizeDecl}\n\t\t${arrDecl}\n\t\t${arrInit}`;
                    }

                    let arrInit = "";
                    if (p.baseType === "String") {
                        arrInit = `for (int i = 0; i < ${p.name}Size; i++) {\n\t\t\t${p.name}[i] = scanner.nextLine();\n\t\t}`;
                    } else {
                        arrInit = `for (int i = 0; i < ${p.name}Size; i++) {\n\t\t\t${p.name}[i] = scanner.next${bType.charAt(0).toUpperCase() + bType.slice(1)}();\n\t\t}`;
                    }

                    return `${sizeDecl}\n\t\t${arrDecl}\n\t\t${arrInit}`;
                } else {
                    if (p.typeModifier) {
                        const typeModifier = typeModifiers[p.typeModifier].java;
                        if (typeModifier === "long" || typeModifier === "short") {
                            type = typeModifier;
                            bType = typeModifier;
                        } else if (typeModifier === "BigInteger") {
                            type = typeModifier;
                            return `${type} ${p.name} = new ${typeModifier}(scanner.next());`;
                        } else {
                            type = `${typeModifier} ${type}`;
                        }
                    }

                    if (p.baseType === "String") {
                        return `${type} ${p.name} = scanner.nextLine();`;
                    }

                    return `${type} ${p.name} = scanner.next${bType.charAt(0).toUpperCase() + bType.slice(1)}();`;
                }
            } else {
                if (p.typeModifier) {
                    const typeModifier = typeModifiers[p.typeModifier].java;
                    if (typeModifier === "long" || typeModifier === "short") {
                        bType = typeModifier;
                    } else if (typeModifier === "BigInteger") {
                        return `${typeModifier} ${p.name} = new ${typeModifier}(scanner.next());`;
                    } else {
                        bType = typeModifier;
                    }
                }

                if (p.baseType === "String") {
                    return `${bType} ${p.name} = scanner.nextLine();`;
                }

                if (p.baseType === "char") {
                    return `${bType} ${p.name} = scanner.next().charAt(0);`;
                }

                return `${bType} ${p.name} = scanner.next${bType.charAt(0).toUpperCase() + bType.slice(1)}();`;
            }
        })
        .join("\n\n\t\t");

    submissionCode = submissionCode.replace("{decl_init}", declInit);

    // function call
    let retType =
        structure.returnType.category === "derived" && structure.returnType.derivedType
            ? derivedTypes[structure.returnType.derivedType].java.replace(
                  "base_type",
                  baseTypes[structure.returnType.baseType].java,
              )
            : baseTypes[structure.returnType.baseType].java;

    if (structure.returnType.typeModifier) {
        const typeModifier = typeModifiers[structure.returnType.typeModifier].java;
        retType = ["short", "BigInteger", "long"].includes(typeModifier) ? typeModifier : `${typeModifier} ${retType}`;
    }

    if (structure.returnType.baseType === "void") {
        submissionCode = submissionCode.replace("{ret_type} result = ", "");
    } else {
        submissionCode = submissionCode.replace("{ret_type}", retType);
    }

    submissionCode = submissionCode.replace("{func_name}", structure.functionName);
    submissionCode = submissionCode.replace("{args}", structure.parameters.map(p => p.name).join(", "));

    // print result
    if (structure.returnType.category === "base" && structure.returnType.baseType) {
        if (structure.returnType.baseType === "void") {
            submissionCode = submissionCode.replace("{print_result}", "");
        } else {
            submissionCode = submissionCode.replace("{print_result}", "System.out.print(result);");
        }
    } else {
        let printResult = "";

        if (structure.returnType.derivedType == "Array") {
            printResult = `for (int i = 0; i < result.length; i++) {\n\t\t\tSystem.out.print(result[i] + " ");\n\t\t}\n\t\tSystem.out.println();`;
        } else {
            printResult = `
			System.out.print(result);
			`;
        }

        submissionCode = submissionCode.replace("{print_result}", printResult);
    }

    return submissionCode;
};
