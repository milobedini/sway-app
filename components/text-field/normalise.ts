import { Normaliser } from "./Normaliser";

export const normalise = (
  value: string,
  normaliser: Normaliser | Normaliser[]
): string => {
  if (Array.isArray(normaliser)) {
    return normaliser.reduce((prev, cur) => cur(prev), value);
  }

  return normaliser(value);
};
