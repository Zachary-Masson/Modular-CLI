import path from "node:path";
import fs from "node:fs";

import type { Options } from "@types";

import { CopyFolderSync } from "@utils";

export function Init(options: Options) {
  const base_dir = path.join(options.dir_cli, "initialise");
  CopyFolderSync(base_dir, options.dir_project);
  fs.mkdirSync(path.join(options.dir_project, "src", "modules"));
}
