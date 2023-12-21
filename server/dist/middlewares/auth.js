"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && typeof authHeader === 'string') {
        if (__1.secretKey) {
            const token = authHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, __1.secretKey, (err, user) => {
                if (err) {
                    return res.status(401).json({ err });
                }
                if (!user) {
                    return res.status(404).json({ message: 'user not exist' });
                }
                else {
                    if (typeof user === 'string') {
                        return res.status(404).json({ message: 'Not valid User' });
                    }
                    else {
                        // count = user.id
                        req.headers["userId"] = user.id;
                        next();
                    }
                }
            });
        }
    }
    else {
        return res.status(404).json({ message: 'Set the authorization header' });
    }
};
exports.authentication = authentication;
