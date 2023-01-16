import { MeditationTileData } from "../meditation-tile/MeditationTileData";
import { TagProps } from "../tag";

export type MeditationTagProps = {
  meditation: MeditationTileData;
} & Omit<TagProps, "children" | "values">;
