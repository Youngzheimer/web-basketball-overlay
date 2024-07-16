import express from "express";
import { WebSocketServer } from "ws";
import path from "path";
import { GameState } from "../types/types";

const app = express();
const server = app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

const wss = new WebSocketServer({ server });

let gameState: GameState = {
  score: { team1: 0, team2: 0 },
  time: "00:00",
};

wss.on("connection", (ws) => {
  ws.send(JSON.stringify(gameState));

  ws.on("message", (messageRaw) => {
    const message = JSON.parse(messageRaw.toString());
    console.log("Received message", message);
    if (message.type === "score") {
      gameState = {
        ...gameState,
        score: {
          team1: gameState.score.team1 + message.score.team1,
          team2: gameState.score.team2 + message.score.team2,
        },
      };
    } else if (message.type === "time") {
      gameState = {
        ...gameState,
        time: message.time,
      };
    }
  });
});

app.use(express.static(path.join(__dirname, "../../dist")));

app.get("/controller", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/controller/index.html"));
});

app.get("/overlay", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/overlay/index.html"));
});
