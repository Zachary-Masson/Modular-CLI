import prompts from "prompts";

export async function StringAsk(ask: string): Promise<string> {
  const { response } = await prompts({
    name: "response",
    message: ask,
    type: "text",
  });

  return response;
}

export async function SelectBasicAsk(
  choices: string[],
  message: string,
): Promise<string> {
  const finalChoices = [];

  for (const choice of choices)
    finalChoices.push({ title: choice, description: choice, value: choice });

  const { response } = await prompts({
    type: "select",
    name: "response",
    message,
    choices: finalChoices,
  });

  return response;
}
