import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import axios from "axios";

import { Fonts } from "../../../../../../fonts";
import { LearnNavigatorParamsList } from "../../../../LearnNavigatorParamsList";
import { Colours } from "../../../../../../colours";
import { baseUrl, secureWithBody } from "../../../../../../lib/api/api";
import { useToast } from "../../../../../../components/toast/useToast";

export type NewCommentProps = StackScreenProps<
  LearnNavigatorParamsList,
  "newComment"
>;

const { width } = Dimensions.get("screen");
const charLimit = 300;
export const NewComment = ({
  route: {
    params: { threadId },
  },
  navigation,
}: NewCommentProps): JSX.Element => {
  const [text, setText] = useState("");
  const [posted, setPosted] = useState(false);
  const onSubmit = async () => {
    if (text.trim().length <= 0) return;

    const data = { text, article: threadId };
    const config = await secureWithBody(`${baseUrl}/comments/`, data, "post");
    try {
      await axios(config);
      setText("");
      Keyboard.dismiss();
      useToast(Platform.OS, "addComment");
    } catch (err) {
      return err;
    }
  };

  return (
    <ReactNativeModal
      isVisible={!posted}
      animationIn={"zoomInUp"}
      animationInTiming={1500}
      animationOut="slideOutDown"
      animationOutTiming={1000}
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 100,
        justifyContent: "flex-start",
      }}
    >
      <KeyboardAvoidingView>
        <AntDesign
          name="closecircleo"
          size={24}
          color={Colours.errorDark.$}
          style={{ alignSelf: "flex-end" }}
          onPress={() => {
            setPosted(true);
            navigation.goBack();
          }}
        />
        <View
          style={{
            width: width - 20,
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 50,
            height: "65%",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            alignSelf: "flex-start",
          }}
        >
          <TextInput
            style={[
              {
                flex: 1,
                fontSize: 24,
                paddingHorizontal: 14,
                marginVertical: 20,
                fontFamily: Fonts.OpenSans_500Medium,
                color: "white",
                //   backgroundColor: "white",
                borderRadius: 50,
                justifyContent: "flex-start",
              },
            ]}
            placeholder="Your Comment..."
            placeholderTextColor="white"
            onChangeText={(x) => {
              if (charLimit - x.length >= 0) {
                setText(x);
              }
            }}
            returnKeyType="none"
            multiline
            numberOfLines={8}
            autoCorrect
            autoFocus
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: "row",

            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: Colours.lightGrey.$,
              textAlign: "center",
              fontFamily: Fonts.OpenSans_400Regular,
            }}
          >
            {charLimit - text.length} Remaining
          </Text>
          <FontAwesome
            name="send-o"
            size={24}
            color={Colours.bright.$}
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              setPosted(true);
              onSubmit();
              navigation.goBack();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </ReactNativeModal>
  );
};
