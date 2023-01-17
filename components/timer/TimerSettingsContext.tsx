import React, { createContext } from "react";

export type TimerContext = {
  meditationMinutes: number;
  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setMeditationMinutes: React.Dispatch<React.SetStateAction<number>>;
};

export const TimerSettingsContent = createContext<TimerContext>({
  meditationMinutes: 10,
  showSettings: false,
  setShowSettings: (showSettings) => !showSettings,
  setMeditationMinutes: (value) => value,
});
