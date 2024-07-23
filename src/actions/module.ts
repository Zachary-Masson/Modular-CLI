import * as fs from "node:fs";
import * as path from "node:path";

import type { Options } from "@types";

import {
  CreateFolderModule,
  getCliFile,
  getDatabase,
  getLastAuthor,
  setLastAuthor,
  StringAsk, toPascalCase,
} from "@utils";

export async function Module(options: Options) {
  await getDatabase();

  const name = await StringAsk("Name of the module (Ex: advanced_presence) : ");
  const author = await StringAsk("Author of the module : ", getLastAuthor());
  const description = await StringAsk("Description of the module: ");

  await setLastAuthor(author);

  await CreateFolderModule(name, options);

  const alias = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "tsconfig.json"), {
      encoding: "utf8",
    }),
  );

  alias.compilerOptions.paths[`@modular(${name})/main`] = [
    `modules/@modular(${name})/module.main.ts`,
  ];

  alias.compilerOptions.paths[`@modular(${name})/*`] = [
    `modules/@modular(${name})/*`,
  ];

  fs.writeFileSync(
    path.join(process.cwd(), "tsconfig.json"),
    JSON.stringify(alias, null, 2),
    { encoding: "utf-8" },
  );

  let module_main = await getCliFile("module.main", options);

  module_main = module_main.replace("$name", name);
  module_main = module_main.replace("$description", description);
  module_main = module_main.replace("$author", author);

  fs.writeFileSync(
    path.join(options.dir_module, "module.main.ts"),
    module_main,
    {
      encoding: "utf-8",
    },
  );

  let main = fs.readFileSync(path.join(options.dir_project, "src", "main.ts"), "utf8");

  main = main.replace("// Imports Modules", `// Imports Modules\nimport ${toPascalCase(name)} from "@modular(${name})/main";`)
  main = main.replace("// Use Module", `// Use Module\nclient.useModule(${toPascalCase(name)});`)

  fs.writeFileSync(
    path.join(options.dir_project, "src", "main.ts"),
    main,
    {
      encoding: "utf-8",
    },
  );
}
