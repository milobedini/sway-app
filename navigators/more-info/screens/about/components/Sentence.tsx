/* eslint-disable no-useless-escape */
import { StyleProp, TextStyle, View } from "react-native";

import { Word } from "./Word";

type SentenceProps = {
  text: string;
  style: StyleProp<TextStyle>;
  uppercase: boolean;
};

export const Sentence = ({
  text,
  style,
  uppercase,
}: SentenceProps): JSX.Element => {
  if (text) {
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {text.split(" ").map((word, index) => (
          <View
            key={`word-${index}`}
            style={{
              flexDirection: "row",
              // @ts-expect-error text style.
              marginRight: (style["fontSize"] ?? 16) / 2,
            }}
          >
            {word.split("").map((char, index) => (
              <Word
                key={`${char}-${index}`}
                char={char}
                style={style}
                uppercase={uppercase}
                shouldAnimate={
                  char.indexOf(`!@#\$%^&*()_+-=[]\;',./<>?:"{}|`) === -1 ||
                  char === " "
                }
              />
            ))}
          </View>
        ))}
      </View>
    );
  }
  return <></>;
};
