export interface Score {
  team1: number;
  team2: number;
}

export interface GameState {
  score: Score;
  time: string;
}
