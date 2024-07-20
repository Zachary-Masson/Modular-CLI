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
exports.Command = Command;
const _utils_1 = require("../../..");
function Command(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let baseFile = yield (0, _utils_1.getCliFile)("command", options);
        const name = yield (0, _utils_1.StringAsk)("Name for new commands (Ex: advanced_presence) : ");
        const description = yield (0, _utils_1.StringAsk)("Description for new commands : ");
        baseFile = baseFile.replace("$name", name);
        baseFile = baseFile.replace("$description", description);
        baseFile = baseFile.replace("$nameOfClass", (0, _utils_1.toPascalCase)(name));
        baseFile = baseFile.replace("$nameOfClass", (0, _utils_1.toPascalCase)(name));
        yield (0, _utils_1.CreateDirInLibs)("commands", options);
        yield (0, _utils_1.CreateFileInLibs)("commands", name, baseFile, options);
    });
}
