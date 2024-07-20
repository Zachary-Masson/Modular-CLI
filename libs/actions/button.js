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
exports.Button = Button;
const _utils_1 = require("../utils/index.js");
function Button(options) {
    return __awaiter(this, void 0, void 0, function* () {
        let baseFile = yield (0, _utils_1.getCliFile)("button", options);
        const name = yield (0, _utils_1.StringAsk)("Name for new button (Ex: apply_button) : ");
        const customId = yield (0, _utils_1.StringAsk)("CustomId for new button (Ex: apply_button) : ");
        const label = yield (0, _utils_1.StringAsk)("Label for new button (Ex: Apply) : ");
        const style = yield (0, _utils_1.SelectBasicAsk)(["Primary", "Secondary", "Success", "Danger", "Link", "Premium"], "Style for new button (Ex: Primary) : ");
        if (style === "Link") {
            const url = yield (0, _utils_1.StringAsk)("URL for new button (Ex: https://zacharymasson.com) : ");
            baseFile = baseFile.replace("$url", `button.setURL("${url}");`);
        }
        else {
            baseFile = baseFile.replace("$url", "");
        }
        baseFile = baseFile.replace("$customId", customId);
        baseFile = baseFile.replace("$label", label);
        baseFile = baseFile.replace("$style", style);
        baseFile = baseFile.replace("$nameOfClass", (0, _utils_1.toPascalCase)(name));
        baseFile = baseFile.replace("$nameOfClass", (0, _utils_1.toPascalCase)(name));
        yield (0, _utils_1.CreateDirInLibs)("buttons", options);
        yield (0, _utils_1.CreateFileInLibs)("buttons", name, baseFile, options);
    });
}
