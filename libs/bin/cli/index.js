#!/usr/bin/env node
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
const node_path_1 = __importDefault(require("node:path"));
const prompts_1 = __importDefault(require("prompts"));
const _actions_1 = require("../..");
const _utils_1 = require("../..");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            dir_project: process.cwd(),
            dir_modules: node_path_1.default.join(process.cwd(), "src", "modules"),
            dir_cli: node_path_1.default.join(__dirname, "..", "..", "..", "cli"),
        };
        let choices = [];
        if (!(yield (0, _utils_1.isInitialise)(options)))
            choices = [
                {
                    title: "Initialise",
                    description: "To initialize the project using the modular core",
                    value: "init",
                },
            ];
        else
            choices = [
                {
                    title: "New Module",
                    description: "This allows you to create a new module",
                    value: "mo",
                },
                {
                    title: "New Command",
                    description: "This will create a new command",
                    value: "cmd",
                },
                {
                    title: "New Entity",
                    description: "This will create a new entity",
                    value: "entity",
                },
                {
                    title: "New Event",
                    description: "This will create a new event",
                    value: "event",
                },
                {
                    title: "New Button",
                    description: "This will create a new button",
                    value: "btn",
                },
            ];
        console.clear();
        const { actions } = yield (0, prompts_1.default)({
            type: "select",
            name: "actions",
            message: "Chose ur actions",
            choices,
        });
        console.clear();
        if (actions === "init")
            return (0, _actions_1.Init)(options);
        else if (actions === "mo")
            return (0, _actions_1.Module)(options);
        options.modules = (0, _utils_1.getModules)(options);
        const module = yield (0, _utils_1.ChooseModule)(options);
        yield (0, _utils_1.setOptions)(module, options);
        switch (actions) {
            case "cmd":
                return (0, _actions_1.Command)(options);
            case "entity":
                return (0, _actions_1.Entity)(options);
            case "event":
                return (0, _actions_1.Event)(options);
            case "btn":
                return (0, _actions_1.Button)(options);
        }
    });
}
main();
