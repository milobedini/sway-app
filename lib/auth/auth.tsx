import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUsername = async () => {
  try {
    const username = await AsyncStorage.getItem("username");
    return username;
  } catch (err) {
    return err;
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (err) {
    return err;
  }
};

export const getUserId = async () => {
  try {
    const id = await AsyncStorage.getItem("id");
    return id;
  } catch (err) {
    return err;
  }
};

export const setUsername = async (username: string) => {
  try {
    await AsyncStorage.setItem("username", username);
  } catch (err) {
    return err;
  }
};
export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (err) {
    return err;
  }
};
export const setUserId = async (id: string) => {
  try {
    await AsyncStorage.setItem("id", id);
  } catch (err) {
    return err;
  }
};

export const removeUsername = async () => {
  try {
    await AsyncStorage.removeItem("username");
  } catch (err) {
    return err;
  }
};
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (err) {
    return err;
  }
};
export const removeUserId = async () => {
  try {
    await AsyncStorage.removeItem("id");
  } catch (err) {
    return err;
  }
};
