import { typeMappings } from "./typeMappings";
import { templates } from "./languageTemplates";

export function generateBoilerplate(structure: any) {
	const functionName = structure.functionName.replace(/\s+/g, "_");

	function generateParams(inputFields: any[], language: string) {
		return inputFields
			.map((field) => {
				const baseType = field.type.split("<")[0]; // Extract base type for mapping
				const mappedType = typeMappings[baseType]?.[language] ?? "any";
				return `${field.name}: ${mappedType}`;
			})
			.join(", ");
	}

	const boilerplates: { [key: string]: string } = {};

	for (const [language, template] of Object.entries(templates)) {
		const langParams = generateParams(structure.inputFields, language);
		const baseOutputType = structure.outputType.split("<")[0]; // Extract base output type
		const langOutputType = typeMappings[baseOutputType]?.[language] ?? "any";

		boilerplates[language] = template
			.replace("{function_name}", functionName)
			.replace("{params}", langParams)
			.replace("{output_type}", langOutputType);
	}

	return boilerplates;
}
