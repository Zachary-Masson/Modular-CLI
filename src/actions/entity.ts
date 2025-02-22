import {ImportType, Options} from "@types";

import {
  CreateDirInLibs,
  CreateFileInLibs,
  getCliFile, ImportInManifest,
  StringAsk,
  toSnakeCase,
} from "@utils";

export async function Entity(options: Options) {
  let baseFile = await getCliFile("entity", options);

  const name = await StringAsk("Name for new entity (Ex: UserPresence) : ");

  const moduleNameString =
    options.moduleName.split("(")[1].split(")")[0];


  baseFile = baseFile.replace("$nameOfClass", `${name}`);
  baseFile = baseFile.replace("$nameOfClass", `${name}`);
  baseFile = baseFile.replace("$tableName", `${moduleNameString}_${toSnakeCase(name)}`)

  await CreateDirInLibs(["entities"], options);

  await CreateFileInLibs(["entities"], toSnakeCase(name), baseFile, options);

  ImportInManifest(options, ImportType.ENTITIES, name, toSnakeCase(name))
}
