/* eslint-disable no-useless-escape */
import { useEffect } from "react";
import { StyleProp, TextStyle } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

import { ReText } from "./ReText";

const alphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&*()_+-=[]\;',./<>?:"{}|`;

type WordProps = {
  char: string;
  shouldAnimate: boolean;
  style: StyleProp<TextStyle>;
  uppercase: boolean;
};

export const Word = ({
  char,
  shouldAnimate,
  style,
  uppercase,
}: WordProps): JSX.Element => {
  const value = useSharedValue(0);
  const maxTimes = useSharedValue(Math.floor(Math.random() * 20) + 10);

  useEffect(() => {
    const random = () => Math.floor(Math.random() * (alphabet.length - 1));
    const randomTimeout = Math.floor(Math.random() * 30) + 20;
    let times = 0;
    // @ts-expect-error timeout.
    let timeoutId;
    clearTimeout(timeoutId);

    const animate = () => {
      timeoutId = setTimeout(() => {
        if (times === maxTimes.value) {
          value.value = alphabet.indexOf(
            uppercase ? String(char).toUpperCase() : char
          );
          return;
        }
        value.value = random();
        times += 1;
        animate();
      }, randomTimeout);
    };
    if (shouldAnimate) {
      animate();
    }

    return () => {
      // @ts-expect-error like.
      clearTimeout(timeoutId);
    };
  }, [char]);

  const animatedChar = useDerivedValue(() => {
    return alphabet[value.value];
  });

  return (
    // @ts-expect-error text prop.
    <ReText text={animatedChar} style={style} />
    //
  );
};
