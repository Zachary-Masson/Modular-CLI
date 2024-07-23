import fs from "node:fs";
import path from "node:path";

import type {ImportType, Options} from "@types";
import { toPascalCase } from "./string";

export function ImportInManifest(options: Options, type: ImportType, nameOfClass: string, name: string, dirs? : string[]) : void {
  let manifest = fs.readFileSync(
    path.join(options.dir_module, "module.main.ts"),
    {
      encoding: "utf-8",
    },
  );

  if (!dirs) manifest = manifest.replace(`// ${toPascalCase(type)}`, `// ${toPascalCase(type)}\nimport ${nameOfClass} from "${options.moduleName}/${type}/${name}";`);
  else manifest = manifest.replace(`// ${toPascalCase(type)}`, `// ${toPascalCase(type)}\nimport ${nameOfClass} from "${options.moduleName}/${type}/${dirs.join("/")}/${name}";`)

  const data = manifest.split(`${type}: [`)[1].split(']')[0];
  const array = data.split(',').map(s => s.trim()).filter(s => s !== "");
  array.push(nameOfClass)
  const newData = `${type}: [${array.join(", ")}]`;

  manifest = manifest.replace(`${type}: [${data}]`, newData);

  fs.writeFileSync(
    path.join(options.dir_module, "module.main.ts"),
    manifest,
    {
      encoding: "utf-8",
    },
  );
}