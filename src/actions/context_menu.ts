import {Options} from "@types";
import {CreateDirInLibs, CreateFileInLibs, getCliFile, SelectBasicAsk, StringAsk, toPascalCase} from "@utils";

export async function Context_menu(options: Options) {
  let baseFile = await getCliFile("contextMenu", options);

  const name = await StringAsk(
    "Name for new contextMenu (Ex: translator) : ",
  );

  const type = await SelectBasicAsk(["User", "Message"],"Type for contextMenu : ");

  baseFile = baseFile.replace("$name", name);
  baseFile = baseFile.replace("$type", type);
  baseFile = baseFile.replace("$nameOfClass", toPascalCase(name));
  baseFile = baseFile.replace("$nameOfClass", toPascalCase(name));

  await CreateDirInLibs(["context_menus"], options);
  await CreateDirInLibs(["context_menus", "message"], options);
  await CreateDirInLibs(["context_menus", "user"], options);

  await CreateFileInLibs(["context_menus", type.toLowerCase()], name, baseFile, options);
}