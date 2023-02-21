import { Dispatch, SetStateAction, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import axios from "axios";

import { Colours } from "../../../../../../colours";
import { Fonts } from "../../../../../../fonts";
import { baseUrl, secureWithBody } from "../../../../../../lib/api/api";
import { useToast } from "../../../../../../components/toast/useToast";

type NewThreadProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setPosted: Dispatch<SetStateAction<boolean>>;
};

const { width } = Dimensions.get("screen");

export const NewThread = ({
  visible,
  setVisible,
  setPosted,
}: NewThreadProps): JSX.Element => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const onSubmit = async () => {
    if (title.trim().length <= 0) return;

    const data = { title, text };

    const config = await secureWithBody(`${baseUrl}/feed/`, data, "post");

    try {
      await axios(config);
      setTitle("");
      setText("");
      Keyboard.dismiss();
      useToast(Platform.OS, "addThread");
    } catch (err) {
      return err;
    }
  };

  return (
    <ReactNativeModal
      isVisible={visible}
      animationIn={"zoomInUp"}
      animationInTiming={1500}
      animationOut="slideOutDown"
      animationOutTiming={1000}
      backdropOpacity={0.9}
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
            setVisible(false);
          }}
        />
        <View
          style={{
            width: width - 24,
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
                flex: 0.2,
                fontSize: 16,
                paddingHorizontal: 16,
                marginTop: 16,
                fontFamily: Fonts.OpenSans_400Regular,
                color: "white",
                borderRadius: 50,
                justifyContent: "flex-start",
                borderBottomColor: "white",
                borderBottomWidth: 1,
                width: "100%",
              },
            ]}
            placeholder="Thread Title..."
            placeholderTextColor="white"
            onChangeText={(x) => {
              setTitle(x);
            }}
            returnKeyType="none"
            multiline
            numberOfLines={3}
            autoCorrect
            autoFocus
          ></TextInput>
          <TextInput
            style={[
              {
                flex: 0.7,
                fontSize: 16,
                paddingHorizontal: 16,
                marginVertical: 16,
                fontFamily: Fonts.OpenSans_400Regular,
                color: "white",
                borderRadius: 50,
                justifyContent: "flex-start",
              },
            ]}
            placeholder="Additional Text... (optional)"
            placeholderTextColor="white"
            onChangeText={(x) => {
              setText(x);
            }}
            returnKeyType="none"
            multiline
            numberOfLines={8}
            autoCorrect
          ></TextInput>
        </View>
        <View>
          <FontAwesome
            name="send-o"
            size={24}
            color={Colours.bright.$}
            style={{ alignSelf: "flex-end" }}
            onPress={() => {
              setVisible(false);
              onSubmit();
              setPosted(true);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </ReactNativeModal>
  );
};
