import {Options} from "@types";
import {CreateDirInLibs, CreateFileInLibs, getCliFile, SelectBasicAsk, StringAsk, toPascalCase} from "@utils";

export async function ContextMenu(options: Options) {
  let baseFile = await getCliFile("contextMenu", options);

  const name = await StringAsk(
    "Name for new contextMenu (Ex: translator) : ",
  );

  const type = await SelectBasicAsk(["User", "Message"],"Type for contextMenu : ");

  baseFile = baseFile.replace("$name", name);
  baseFile = baseFile.replace("$type", type);
  baseFile = baseFile.replace("$nameOfClass", toPascalCase(name));
  baseFile = baseFile.replace("$nameOfClass", toPascalCase(name));

  await CreateDirInLibs(["contextMenus"], options);
  await CreateDirInLibs(["contextMenus", "message"], options);
  await CreateDirInLibs(["contextMenus", "user"], options);

  await CreateFileInLibs(["contextMenus", type.toLowerCase()], name, baseFile, options);
}