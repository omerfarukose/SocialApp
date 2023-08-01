import AsyncStorage from "@react-native-async-storage/async-storage";

export class UserInfo{

    async GetUserId() {
        let id = await AsyncStorage.getItem("userId");

        return id || "";
    }

    async GetUserName() {
        let name = await AsyncStorage.getItem("username");

        return name;
    }

}
