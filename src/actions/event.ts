import type { Options } from "@types";

import {
  CreateDirInLibs,
  CreateFileInLibs,
  getCliFile, SelectAsk,
  StringAsk,
  toSnakeCase,
} from "@utils";
import {Events} from "@data";

export async function Event(options: Options) {
  let baseFile = await getCliFile("event", options);

  const name = await StringAsk("Name for new event (Ex: Ready) : ");
  const eventName = await SelectAsk(Events, "Choices events : ")

  baseFile = baseFile.replace("$nameOfClass", name);
  baseFile = baseFile.replace("$nameOfClass", name);
  baseFile = baseFile.replace("$eventName", eventName);

  await CreateDirInLibs("events", options);

  await CreateFileInLibs("events", toSnakeCase(name), baseFile, options);
}
