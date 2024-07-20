"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = Module;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const _utils_1 = require("../../..");
function Module(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = yield (0, _utils_1.StringAsk)("Name of the module (Ex: advanced_presence) : ");
        const author = yield (0, _utils_1.StringAsk)("Author of the module : ");
        const description = yield (0, _utils_1.StringAsk)("Description of the module: ");
        yield (0, _utils_1.CreateFolderModule)(name, options);
        const alias = JSON.parse(fs.readFileSync(path.join(process.cwd(), "tsconfig.json"), {
            encoding: "utf8",
        }));
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
        fs.writeFileSync(path.join(process.cwd(), "tsconfig.json"), JSON.stringify(alias, null, 2), { encoding: "utf-8" });
        let module_main = yield (0, _utils_1.getCliFile)("module.main", options);
        module_main = module_main.replace("$name", name);
        module_main = module_main.replace("$description", description);
        module_main = module_main.replace("$author", author);
        fs.writeFileSync(path.join(options.dir_module, "module.main.ts"), module_main, {
            encoding: "utf-8",
        });
    });
}
