import Toast from "react-native-toast-message";

export const useToast = (os: string, action: string) => {
  if (os !== "web" && action === "add") {
    Toast.show({
      type: "add",
      text1: "Note added",
      visibilityTime: 1500,
    });
  }
  if (os !== "web" && action === "addComment") {
    Toast.show({
      type: "add",
      text1: "Comment added",
      visibilityTime: 1500,
    });
  }
  if (os !== "web" && action === "remove") {
    Toast.show({
      type: "remove",
      text1: "Note removed",
      visibilityTime: 1500,
    });
  }
};
