import type { Options } from "@types";

import prompts from "prompts";

export async function ChooseModule(options: Options): Promise<string> {
  const choices = [];

  for (const module of options.modules)
    choices.push({
      title: `${module}`,
      description: "",
      value: module,
    });

  const { name } = await prompts({
    name: "name",
    message: `Choose module (Ex: ${options.modules[0]}) : `,
    choices,
    type: "select",
  });

  return name;
}
