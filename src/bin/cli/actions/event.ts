import type { Options } from "@types";

import {
  CreateDirInLibs,
  CreateFileInLibs,
  getCliFile,
  StringAsk,
  toSnakeCase,
} from "@utils";

export async function Event(options: Options) {
  let baseFile = await getCliFile("event", options);

  const name = await StringAsk("Name for new event (Ex: Ready) : ");

  baseFile = baseFile.replace("$nameOfClass", name);
  baseFile = baseFile.replace("$nameOfClass", name);

  await CreateDirInLibs("events", options);

  await CreateFileInLibs("events", toSnakeCase(name), baseFile, options);
}
