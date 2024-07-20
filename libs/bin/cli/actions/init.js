"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init = Init;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const _utils_1 = require("../../..");
function Init(options) {
    const base_dir = node_path_1.default.join(options.dir_cli, "initialise");
    (0, _utils_1.CopyFolderSync)(base_dir, options.dir_project);
    node_fs_1.default.mkdirSync(node_path_1.default.join(options.dir_project, "src", "modules"));
}
