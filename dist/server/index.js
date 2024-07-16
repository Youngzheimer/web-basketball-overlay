"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
const wss = new ws_1.WebSocketServer({ server });
let gameState = {
    score: { team1: 0, team2: 0 },
    time: "00:00",
};
wss.on("connection", (ws) => {
    ws.send(JSON.stringify(gameState));
    ws.on("message", (messageRaw) => {
        const message = JSON.parse(messageRaw.toString());
        console.log("Received message", message);
        if (message.type === "score") {
            gameState = Object.assign(Object.assign({}, gameState), { score: {
                    team1: gameState.score.team1 + message.score.team1,
                    team2: gameState.score.team2 + message.score.team2,
                } });
        }
        else if (message.type === "time") {
            gameState = Object.assign(Object.assign({}, gameState), { time: message.time });
        }
    });
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../../dist")));
app.get("/controller", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../dist/controller/index.html"));
});
app.get("/overlay", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../dist/overlay/index.html"));
});
