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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = Entity;
const _utils_1 = require("../utils/index.js");
function Entity(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let baseFile = yield (0, _utils_1.getCliFile)("entity", options);
        const name = yield (0, _utils_1.StringAsk)("Name for new entity (Ex: UserPresence) : ");
        const moduleNameString = (0, _utils_1.toPascalCase)(options.moduleName.split("(")[1].split(")")[0]);
        baseFile = baseFile.replace("$nameOfClass", `${moduleNameString}${name}`);
        baseFile = baseFile.replace("$nameOfClass", `${moduleNameString}${name}`);
        yield (0, _utils_1.CreateDirInLibs)("entities", options);
        yield (0, _utils_1.CreateFileInLibs)("entities", (0, _utils_1.toSnakeCase)(name), baseFile, options);
    });
}
