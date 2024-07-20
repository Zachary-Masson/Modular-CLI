import type { Options } from "@types";

import {
  CreateDirInLibs,
  CreateFileInLibs,
  getCliFile,
  SelectBasicAsk,
  StringAsk,
  toPascalCase,
} from "@utils";

export async function Button(options: Options) {
  let baseFile = await getCliFile("button", options);

  const name = await StringAsk("Name for new button (Ex: apply_button) : ");

  const customId = await StringAsk(
    "CustomId for new button (Ex: apply_button) : ",
  );

  const label = await StringAsk("Label for new button (Ex: Apply) : ");

  const style = await SelectBasicAsk(
    ["Primary", "Secondary", "Success", "Danger", "Link", "Premium"],
    "Style for new button (Ex: Primary) : ",
  );

  if (style === "Link") {
    const url = await StringAsk(
      "URL for new button (Ex: https://zacharymasson.com) : ",
    );
    baseFile = baseFile.replace("$url", `button.setURL(${url});`);
  } else {
    baseFile = baseFile.replace("$url", "");
  }

  baseFile = baseFile.replace("$customId", customId);
  baseFile = baseFile.replace("$label", label);
  baseFile = baseFile.replace("$style", style);
  baseFile = baseFile.replace("$nameOfClass", toPascalCase(name));
  baseFile = baseFile.replace("$nameOfClass", toPascalCase(name));

  await CreateDirInLibs("buttons", options);

  await CreateFileInLibs("buttons", name, baseFile, options);
}
