import type { Options } from "@types";

import {
  CreateDirInLibs,
  CreateFileInLibs,
  getCliFile,
  StringAsk,
  toPascalCase,
} from "@utils";

export async function Command(options: Options) {
  let baseFile = await getCliFile("command", options);

  const name = await StringAsk(
    "Name for new commands (Ex: advanced_presence) : ",
  );

  const description = await StringAsk("Description for new commands : ");

  baseFile = baseFile.replace("$name", name);
  baseFile = baseFile.replace("$description", description);
  baseFile = baseFile.replace("$nameOfClass", toPascalCase(name));
  baseFile = baseFile.replace("$nameOfClass", toPascalCase(name));

  await CreateDirInLibs("commands", options);

  await CreateFileInLibs("commands", name, baseFile, options);
}
