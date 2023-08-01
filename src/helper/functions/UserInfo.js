import AsyncStorage from "@react-native-async-storage/async-storage";

export async function GetUserId(){
    return await AsyncStorage.getItem("userId");
}

export async function SetUserId(id){
     await AsyncStorage.setItem("userId", id);
}

export async function GetUserName(){
    return await AsyncStorage.getItem("username");
}

export async function SetUsername(name){
    await AsyncStorage.setItem("username", name);
}
