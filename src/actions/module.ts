import * as fs from "node:fs";
import * as path from "node:path";

import type { Options } from "@types";

import {
  CreateFolderModule,
  getCliFile,
  getDatabase,
  getLastAuthor,
  setLastAuthor,
  StringAsk,
} from "@utils";

export async function Module(options: Options) {
  await getDatabase();

  const name = await StringAsk("Name of the module (Ex: advanced_presence) : ");
  const author = await StringAsk("Author of the module : ", getLastAuthor());
  const description = await StringAsk("Description of the module: ");

  await setLastAuthor(author);

  await CreateFolderModule(name, options);

  const alias = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "tsconfig.alias.json"), {
      encoding: "utf8",
    }),
  );

  alias.compilerOptions.paths[`@modular(${name})/*`] = [
    `modules/@modular(${name})/libs/*`,
  ];
  alias.compilerOptions.paths[`@modular(${name})/commands/*`] = [
    `modules/@modular(${name})/libs/commands/*`,
  ];
  alias.compilerOptions.paths[`@modular(${name})/entities/*`] = [
    `modules/@modular(${name})/libs/entities/*`,
  ];
  alias.compilerOptions.paths[`@modular(${name})/events/*`] = [
    `modules/@modular(${name})/libs/events/*`,
  ];
  alias.compilerOptions.paths[`@modular(${name})/buttons/*`] = [
    `modules/@modular(${name})/libs/buttons/*`,
  ];

  fs.writeFileSync(
    path.join(process.cwd(), "tsconfig.alias.json"),
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
}
