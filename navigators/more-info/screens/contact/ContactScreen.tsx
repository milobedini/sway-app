import {
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import qs from "qs";
import { useState } from "react";
import { View } from "@motify/components";

import { Fonts } from "../../../../fonts";
import { Colours } from "../../../../colours";
import { useAppSelector } from "../../../../lib/redux/hooks";

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontFamily: Fonts.OpenSans_700Bold,
    lineHeight: 1.2 * 36,
    textAlign: "center",
    color: "white",
    marginTop: 36,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: Fonts.OpenSans_500Medium,
    lineHeight: 1.2 * 24,
    color: "white",
    marginTop: 36,
    marginBottom: 24,
  },
  input: {
    // backgroundColor: Colours.darkButton.$,
    height: 140,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    paddingHorizontal: 22,
    paddingTop: 4,
    fontSize: 16,
    fontFamily: Fonts.OpenSans_400Regular,
    lineHeight: 1.6 * 16,
    color: Colours.brightGrey.$,
    width: "100%",
  },
  sendButton: {
    width: 220,
    height: 56,
    borderRadius: 32,
    backgroundColor: Colours.bright.$,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    marginTop: 0,
    marginBottom: 0,
    color: Colours.dark.$,
  },
});

export const ContactScreen = (): JSX.Element => {
  const [text, setText] = useState("");
  // @ts-expect-error redux.
  const user = useAppSelector((state) => state.userProfile.profile);

  const sendEmail = async (
    to: string,
    subject: string,
    body: string
  ): Promise<void> => {
    let url = `mailto:${to}`;

    const query = qs.stringify({
      subject: subject,
      body: body,
    });

    if (query.length) {
      url += `?${query}`;
    }

    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      throw new Error("Provided URL can not be handled");
    }

    return Linking.openURL(url);
  };

  const handleEmail = async () => {
    try {
      await sendEmail(
        "milobedini64@gmail.com",
        `From user ${user.username}`,
        text
      );
    } catch (err) {
      return err;
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, marginHorizontal: 22, alignItems: "center" }}
    >
      <Text style={styles.title}>Get In Touch</Text>
      <Text style={styles.subtitle}>
        Contact us if you have any questions, feedback, or just to say hi!
      </Text>
      <View
        style={{ width: "100%", alignItems: "center" }}
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 400 }}
      >
        <TextInput
          style={styles.input}
          multiline
          autoCorrect
          numberOfLines={10}
          onChangeText={(value) => setText(value)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleEmail}>
          <Text style={[styles.subtitle, styles.buttonText]}>Send Email</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
