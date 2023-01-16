import { useWindowDimensions } from "react-native";

import { MeditationTileProps } from "./MeditationTileProps";
import { SmallMeditationTile } from "./SmallMeditationTile";

export const MeditationTile = (props: MeditationTileProps): JSX.Element => {
  const { width } = useWindowDimensions();

  switch (width) {
    // case 'medium':
    //     return <MediumRecipeTile {...props} />;
    //   case 'large':
    //     return <LargeRecipeTile {...props} />;
    default:
      return <SmallMeditationTile {...props} />;
  }
};
