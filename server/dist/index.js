"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.secretKey = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const ws_1 = require("ws");
const ws_2 = require("./ws-connection/ws");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const app1 = (0, express_1.default)();
const PORT1 = 3000;
dotenv_1.default.config();
app1.use((0, cors_1.default)());
app1.use(express_1.default.json());
app1.use('/user', user_1.default);
app1.use('/rooms', rooms_1.default);
const mongoose_url = process.env.MONGOOSE_URL;
exports.secretKey = process.env.SECRET_KEY;
exports.server = http_1.default.createServer(app1);
const wss = new ws_1.WebSocketServer({ server: exports.server });
wss.on('connection', (ws, req) => {
    ws.send("Bro made a successfull connection");
    (0, ws_2.wsOnconnection)(ws, req);
});
if (mongoose_url && exports.secretKey) {
    exports.server.listen(PORT1, () => {
        console.log(`Server running at http://localhost:${PORT1}`);
    });
    mongoose_1.default.connect(`${mongoose_url}/Chats`, { dbName: 'Chats' }).then(() => { console.log("connected"); });
}
else {
    console.log("please connect to mongoose before running and also enter the secret values");
}
// const PORT2 = 3001
// const PORT2 = 3001
// app2.listen(PORT2,()=>{
//     console.log(`Server running at http://localhost:${PORT2}`)
// })
