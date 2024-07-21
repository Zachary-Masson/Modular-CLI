import fs from "node:fs";
import path from "node:path";

import type { Options } from "@types";

export async function CreateDirInLibs(
  dirs: string[],
  options: Options,
): Promise<void> {
  if (!fs.existsSync(path.join(options.dir_libs, ...dirs)))
    fs.mkdirSync(path.join(options.dir_libs, ...dirs));
}

export async function CreateFileInLibs(
  dirs: string[],
  name: string,
  data: string,
  options: Options,
): Promise<void> {
  fs.writeFileSync(path.join(options.dir_libs, ...dirs, `${name}.ts`), data, {
    encoding: "utf8",
  });
}

export async function setOptions(module: string, options: Options) {
  options.dir_module = path.join(options.dir_modules, module);
  options.dir_libs = path.join(options.dir_module, "libs");
  options.moduleName = module;
  return;
}

export function getModules(options: Options): string[] {
  return fs.readdirSync(path.join(options.dir_modules));
}

export async function CreateFolderModule(moduleName: string, options: Options) {
  fs.mkdirSync(path.join(options.dir_modules, `@modular(${moduleName})`));
  fs.mkdirSync(
    path.join(options.dir_modules, `@modular(${moduleName})`, "libs"),
  );

  await setOptions(`@modular(${moduleName})`, options);
}

export function CopyFolderSync(src: string, dest: string) {
  // Crée le dossier de destination s'il n'existe pas
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Lire tous les éléments du dossier source
  const items = fs.readdirSync(src);

  // Parcourir chaque élément dans le dossier source
  items.forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    // Vérifier si l'élément est un dossier ou un fichier
    if (fs.lstatSync(srcPath).isDirectory()) {
      // Si c'est un dossier, appeler la fonction récursivement
      CopyFolderSync(srcPath, destPath);
    } else {
      // Si c'est un fichier, le copier
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

export async function getCliFile(filename: string, options: Options) {
  return fs.readFileSync(path.join(options.dir_cli, filename), {
    encoding: "utf-8",
  });
}

export async function isInitialise(options: Options) {
  return fs.existsSync(path.join(options.dir_project, "src"));
}
