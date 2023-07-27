import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { AppColors } from "../../values/Colors";
import { useState } from "react";
import { MyButton } from "../../components/MyButton";
import { MyTextInput } from "../../components/Input/MyTextInput";

export const LoginScreen = ({navigation}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return(
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: AppColors.mainColor,
            }}>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}>

                        <Text
                            style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 55
                            }}>

                            social

                        </Text>

                        <View
                            style={{
                                width: "100%",
                                height: "35%",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                            }}>

                            <MyTextInput
                                value={username}
                                setValue={setUsername}
                                placeholder={"Kullanıcı Adı"}/>

                            <MyTextInput
                                value={password}
                                setValue={setPassword}
                                placeholder={"Parola"}/>

                            <MyButton
                                onPress={() => navigation.navigate("HomeTabs")}
                                title={"Giriş"}/>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("SignUp")}>

                                <Text
                                    style={{
                                        color: "white",
                                    }}>

                                    Hesabın yok mu? Hesap Oluştur!

                                </Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}
