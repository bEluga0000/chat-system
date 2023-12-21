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
const auth_1 = require("../middlewares/auth");
const variables_1 = require("../zodvariables/variables");
const router = express_1.default.Router();
router.post('/createRoom', auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInputs = variables_1.createRoomVars.safeParse(req.body);
    if (!parsedInputs.success) {
        res.status(401).json({ message: 'Wrong Inputs' });
    }
    else {
        try {
            const { name } = parsedInputs.data;
            const createdUserId = req.headers['userId'];
            const newRoom = new db_1.Rooms({ name, subscribeUsers: [createdUserId], createdBy: createdUserId });
            yield newRoom.save();
            const user = yield db_1.User.findByIdAndUpdate(createdUserId, { $push: { rooms: newRoom._id } }, { new: true });
            res.status(201).json({ roomId: newRoom._id, user });
        }
        catch (err) {
            res.status(501).send(err);
        }
    }
}));
router.put('/join', auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInputs = variables_1.joinRoomsVars.safeParse(req.body);
    if (!parsedInputs.success) {
        res.status(401).json({ message: 'Wrong Inputs' });
    }
    else {
        try {
            const { roomId } = parsedInputs.data;
            const userId = req.headers['userId'];
            const isRoom = yield db_1.Rooms.findById(roomId);
            if (!userId || Array.isArray(userId)) {
                console.log('hi am here dude');
                res.status(401).json({ message: 'UserId error' });
            }
            else {
                if (!isRoom) {
                    res.status(404).json({ message: 'room not found' });
                    return;
                }
                else {
                    const userInRoom = isRoom.subscribeUsers.includes(userId);
                    if (userInRoom) {
                        res.status(401).json({ message: 'User Already in that room' });
                        return;
                    }
                    else {
                        console.log('I am running');
                        const user = yield db_1.User.findByIdAndUpdate(userId, { $push: { rooms: roomId } }, { new: true });
                        const room = yield db_1.Rooms.findByIdAndUpdate(roomId, { $push: { subscribeUsers: userId } }, { new: true });
                        res.status(201).json({ message: 'Room created successfully', user });
                    }
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}));
router.put('/exit/:roomId', auth_1.authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // todo i need to make some condition that if the created user leaves what next do we need to delete the whole room or do we need to keep them
    const roomId = req.params.roomId;
    const userId = req.headers['userId'];
    const isRoom = yield db_1.Rooms.findById(roomId);
    if (!userId || Array.isArray(userId)) {
        // console.log('hi am here dude')
        res.status(401).json({ message: 'UserId error' });
    }
    else {
        if (!isRoom) {
            res.status(404).json({ message: 'room not found' });
            return;
        }
        else {
            const userInRoom = isRoom.subscribeUsers.includes(userId);
            if (userInRoom) {
                const user = yield db_1.User.findByIdAndUpdate(userId, { $pull: { rooms: roomId } }, { new: true });
                const room = yield db_1.Rooms.findByIdAndUpdate(roomId, { $pull: { subscribeUsers: userId } }, { new: true });
                res.status(201).json({ message: 'Room created successfully', user });
            }
            else {
                res.status(401).json({ message: 'User Already in that room' });
                return;
            }
        }
    }
}));
exports.default = router;
