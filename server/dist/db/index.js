"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rooms = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    useremail: String,
    password: String,
    username: String,
    rooms: { type: [String], default: [] },
    ws: { type: mongoose_1.default.Schema.Types.Mixed, default: null }
});
const roomSchema = new mongoose_1.default.Schema({
    name: String,
    subscribeUsers: { type: [String], reqiured: true },
    createdBy: String
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Rooms = mongoose_1.default.model('Rooms', roomSchema);
