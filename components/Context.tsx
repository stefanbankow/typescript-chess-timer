import { createContext } from "react";

export const GameSettingsContext = createContext({
  timeSetting: 300000,
  increment: 0,
});
