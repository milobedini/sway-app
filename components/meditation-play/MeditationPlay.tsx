import { Modal, View, Text, TouchableOpacity } from "react-native";

import { Colours } from "../../colours";
import { textStyles } from "../text";

export const MeditationPlay = ({ setModalVisible }): JSX.Element => (
  <Modal animationType="slide" transparent={true} visible={true}>
    <View
      style={{
        marginTop: 22,
        backgroundColor: Colours.dark.$,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={textStyles.title}>Hello World!</Text>

        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <Text style={textStyles.body}>Hide Modal</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);
