import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text, TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { AppColors } from "../../values/Colors";
import { useState } from "react";
import { MyButton } from "../../components/MyButton";
import { MyTextInput } from "../../components/Input/MyTextInput";
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { validateEmail } from "../../helper/functions/MyHelperFunctions";
import { navigate } from "../Router/RootNavigation";

export const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const showToast = (text, type = "error") => {
        Toast.show({
            type: type,
            text2: text
        });
    }

    const _handleLoginPress = ( ) => {

        if (validateEmail(email)) {

            if (password) {

                auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(() => {
                        console.log('user login success !');

                        setPassword("");
                        setEmail("");

                        navigate("HomeTabs")
                    })
                    .catch(error => {
                        console.error(error);

                        showToast("Kullanıcı Adı & Parola hatalı")
                    });

            } else {
                // show password alert !
                showToast("Parola Giriniz")
            }

        } else {
            // show username alert !
            showToast("Geçersiz E-mail")
        }

    }

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
                                value={email}
                                setValue={setEmail}
                                placeholder={"E-mail"}/>

                            <MyTextInput
                                value={password}
                                setValue={setPassword}
                                placeholder={"Parola"}/>

                            <MyButton
                                onPress={() => _handleLoginPress()}
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
