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
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const variables_1 = require("../zodvariables/variables");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInputs = variables_1.authVaraibles.safeParse(req.body);
    if (!parsedInputs.success) {
        res.status(401).json({ message: 'Error Wrong Inputs' });
    }
    else {
        const { useremail, password } = parsedInputs.data;
        const existingUser = yield db_1.User.findOne({ useremail });
        if (!existingUser) {
            const newUser = new db_1.User({ useremail, password });
            if (__1.secretKey) {
                const token = jsonwebtoken_1.default.sign({ id: newUser._id }, __1.secretKey, { expiresIn: '1h' });
                yield newUser.save();
                res.status(201).json({ message: 'USer signup successfully', token });
            }
        }
        else {
            const user = yield db_1.User.findOne({ useremail, password });
            if (user) {
                if (__1.secretKey) {
                    const token = jsonwebtoken_1.default.sign({ id: user._id }, __1.secretKey, { expiresIn: '1h' });
                    res.status(201).json({ token, message: 'User Logged in Sucessfully' });
                }
                else {
                    res.status(404).json({ message: 'User Already exist please login' });
                }
            }
        }
    }
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInputs = variables_1.authVaraibles.safeParse(req.body);
    if (!parsedInputs.success) {
        res.status(401).json({ message: 'rong Inputs' });
    }
    else {
        const { useremail, password } = parsedInputs.data;
        const user = yield db_1.User.findOne({ useremail, password });
        if (user) {
            if (__1.secretKey) {
                const token = jsonwebtoken_1.default.sign({ id: user._id }, __1.secretKey, { expiresIn: '1h' });
                res.status(201).json({ message: 'Loggedin successfully', token });
            }
        }
        else {
            res.status(201).json({ message: 'Wrong credentials' });
        }
    }
}));
router.get('/me', auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers['userId'];
    const user = yield db_1.User.findById(userId);
    if (user) {
        res.status(201).json({ useremail: user.useremail, rooms: user.rooms });
    }
    else {
        res.status(404).json({ message: 'user Not found' });
    }
}));
exports.default = router;
