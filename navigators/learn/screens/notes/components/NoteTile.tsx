import { useWindowDimensions } from "react-native";

import { NoteTileProps } from "./NoteTileProps";
import { SmallNoteTile } from "./SmallNoteTile";

export const NoteTile = (props: NoteTileProps): JSX.Element => {
  const { width } = useWindowDimensions();
  switch (width) {
    // case 'medium':
    //     return <MediumRecipeTile {...props} />;
    //   case 'large':
    //     return <LargeRecipeTile {...props} />;
    default:
      return <SmallNoteTile {...props} />;
  }
};
