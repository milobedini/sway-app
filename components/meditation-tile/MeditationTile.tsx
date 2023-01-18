import { useWindowDimensions } from "react-native";

import { MeditationTileProps } from "./MeditationTileProps";
import { SmallMeditationTile } from "./SmallMeditationTile";

export const MeditationTile = (props: MeditationTileProps): JSX.Element => {
  const { width } = useWindowDimensions();

  switch (width) {
    // case 'medium':
    //     return <MediumMeditationTile {...props} />;
    //   case 'large':
    //     return <LargeMeditationTile {...props} />;
    default:
      return <SmallMeditationTile {...props} />;
  }
};
