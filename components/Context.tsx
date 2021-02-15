import { createContext } from "react";

export const GameSettingsContext = createContext({
  timeSetting: 600000,
  increment: 0,
  player1Name: "Player 1",
  player2Name: "Player 2",
});
