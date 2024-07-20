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
exports.InitDatabase = InitDatabase;
exports.getDatabase = getDatabase;
exports.save = save;
exports.getLastAuthor = getLastAuthor;
exports.setLastAuthor = setLastAuthor;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
let database;
const databasePath = node_path_1.default.join(__dirname, "..", "database.json");
function InitDatabase() {
    database = {
        last_author: "",
    };
    return node_fs_1.default.existsSync(databasePath)
        ? null
        : node_fs_1.default.writeFileSync(databasePath, JSON.stringify(database, null, 2));
}
function getDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        database = JSON.parse(node_fs_1.default.readFileSync(databasePath, { encoding: "utf-8" }));
        return;
    });
}
function save() {
    return __awaiter(this, void 0, void 0, function* () {
        return node_fs_1.default.writeFileSync(databasePath, JSON.stringify(database, null, 2));
    });
}
function getLastAuthor() {
    return database.last_author;
}
function setLastAuthor(author) {
    return __awaiter(this, void 0, void 0, function* () {
        database.last_author = author;
        yield save();
    });
}
