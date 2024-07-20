import type { Options } from "@types";

import {
  CreateDirInLibs,
  CreateFileInLibs,
  getCliFile,
  StringAsk,
  toPascalCase,
  toSnakeCase,
} from "@utils";

export async function Entity(options: Options) {
  let baseFile = await getCliFile("entity", options);

  const name = await StringAsk("Name for new entity (Ex: UserPresence) : ");

  const moduleNameString = toPascalCase(
    options.moduleName.split("(")[1].split(")")[0],
  );

  baseFile = baseFile.replace("$nameOfClass", `${moduleNameString}${name}`);
  baseFile = baseFile.replace("$nameOfClass", `${moduleNameString}${name}`);

  await CreateDirInLibs("entities", options);

  await CreateFileInLibs("entities", toSnakeCase(name), baseFile, options);
}
