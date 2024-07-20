"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDirInLibs = CreateDirInLibs;
exports.CreateFileInLibs = CreateFileInLibs;
exports.setOptions = setOptions;
exports.getModules = getModules;
exports.CreateFolderModule = CreateFolderModule;
exports.CopyFolderSync = CopyFolderSync;
exports.getCliFile = getCliFile;
exports.isInitialise = isInitialise;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
function CreateDirInLibs(dir, options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!node_fs_1.default.existsSync(node_path_1.default.join(options.dir_libs, dir)))
            node_fs_1.default.mkdirSync(node_path_1.default.join(options.dir_libs, dir));
    });
}
function CreateFileInLibs(dir, name, data, options) {
    return __awaiter(this, void 0, void 0, function* () {
        node_fs_1.default.writeFileSync(node_path_1.default.join(options.dir_libs, dir, `${name}.ts`), data, {
            encoding: "utf8",
        });
    });
}
function setOptions(module, options) {
    return __awaiter(this, void 0, void 0, function* () {
        options.dir_module = node_path_1.default.join(options.dir_modules, module);
        options.dir_libs = node_path_1.default.join(options.dir_module, "libs");
        options.moduleName = module;
        return;
    });
}
function getModules(options) {
    return node_fs_1.default.readdirSync(node_path_1.default.join(options.dir_modules));
}
function CreateFolderModule(moduleName, options) {
    return __awaiter(this, void 0, void 0, function* () {
        node_fs_1.default.mkdirSync(node_path_1.default.join(options.dir_modules, `@modular(${moduleName})`));
        node_fs_1.default.mkdirSync(node_path_1.default.join(options.dir_modules, `@modular(${moduleName})`, "libs"));
        yield setOptions(`@modular(${moduleName})`, options);
    });
}
function CopyFolderSync(src, dest) {
    if (!node_fs_1.default.existsSync(dest)) {
        node_fs_1.default.mkdirSync(dest, { recursive: true });
    }
    const items = node_fs_1.default.readdirSync(src);
    items.forEach((item) => {
        const srcPath = node_path_1.default.join(src, item);
        const destPath = node_path_1.default.join(dest, item);
        if (node_fs_1.default.lstatSync(srcPath).isDirectory()) {
            CopyFolderSync(srcPath, destPath);
        }
        else {
            node_fs_1.default.copyFileSync(srcPath, destPath);
        }
    });
}
function getCliFile(filename, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return node_fs_1.default.readFileSync(node_path_1.default.join(options.dir_cli, filename), {
            encoding: "utf-8",
        });
    });
}
function isInitialise(options) {
    return __awaiter(this, void 0, void 0, function* () {
        return node_fs_1.default.existsSync(node_path_1.default.join(options.dir_project, "src"));
    });
}
