import React, { ReactNode } from "react";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";

export type FontsContainerProps = { children: ReactNode };

export const FontsContainer = ({
  children,
}: FontsContainerProps): JSX.Element => {
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_700Bold,
  });

  if (fontsLoaded) {
    return <>{children}</>;
  } else return <></>;
};
