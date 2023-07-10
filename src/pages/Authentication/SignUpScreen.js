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
import { MyTextInput } from "../../components/Input/MyTextInput";
import { MyButton } from "../../components/MyButton";

export const SignUpScreen = ({navigation}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
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

                            SOCIAL

                        </Text>

                        <View
                            style={{
                                width: "100%",
                                height: "45%",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                            }}>

                            <MyTextInput
                                value={username}
                                setValue={setUsername}
                                placeholder={"Kullanıcı Adı"}/>

                            <MyTextInput
                                value={email}
                                setValue={setEmail}
                                placeholder={"E-mail"}/>

                            <MyTextInput
                                value={password}
                                setValue={setPassword}
                                placeholder={"Parola"}/>

                            <MyButton
                                title={"Kayıt"}/>

                            <TouchableOpacity
                                onPress={() => navigation.navigate("Login")}>

                                <Text
                                    style={{
                                        color: "white",
                                    }}>

                                    Hesabın var mı? Giriş Yap

                                </Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}
