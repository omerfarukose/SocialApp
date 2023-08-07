import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { useContext, useState } from "react";
import { MyTextInput } from "../../components/Input/MyTextInput";
import { MyButton } from "../../components/MyButton";
import Toast from 'react-native-toast-message';
import { navigate } from "../Router/RootNavigation";
import { validateEmail } from "../../helper/functions/MyHelperFunctions";
import { CreateUser } from "../../helper/functions/firebase/Firestore";
import { SignUp } from "../../helper/functions/firebase/Auth";
import { ThemeContext } from "../../contexts/ThemeContext";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

export const SignUpScreen = ( ) => {

    let { theme } = useContext(ThemeContext);


    const [myUsername, setMyUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const showToast = (text, type = "error") => {
        Toast.show({
            type: type,
            text2: text
        });
    }

    const _handleSignupPress = ( ) => {

        if (myUsername) {

            if (validateEmail(email)) {

                // least 6 char
                if (password) {

                    if (password.length >= 6) {

                        SignUp(email, password)
                            .then(() => {
                                CreateUser(myUsername, email).then(() => {
                                    showToast("Kullanıcı Oluşturuldu", "success");
                                    navigate("Login");
                                });
                            })
                            .catch((errorCode) => {
                                switch (errorCode) {
                                    case 'auth/email-already-in-use':
                                        console.log('That email address is already in use!');
                                        showToast("E-mail adresi zaten kullanılıyor");
                                        break;
                                    case 'auth/invalid-email':
                                        console.log('That email address is invalid');
                                        showToast("Geçersiz e-mail");
                                        break;
                                    default:
                                        showToast("Kullanıcı oluşturulamadı");
                                }
                            });

                    } else {
                        // show password alert !
                        showToast("Parola en az 6 karakter olmalı");
                    }

                } else {
                    // show password alert !
                    showToast("Parola Giriniz")
                }

            } else {
                // show username alert !
                showToast("Geçersiz E-mail")
            }

        }  else {
            // show username alert !
            showToast("Kullanıcı Adı Giriniz")
        }

    }

    return(
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.secondColor,
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

                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={{
                                width: "80%",
                                resizeMode: "contain"
                            }}/>

                        <View
                            style={{
                                width: "100%",
                                height: "45%",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                            }}>

                            <MyTextInput
                                value={myUsername}
                                setValue={setMyUsername}
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
                                onPress={() => _handleSignupPress()}
                                style={{
                                    backgroundColor: theme.mainColor,
                                    width: wp(30),
                                    alignItems: "center"
                                }}
                                title={"Kayıt"}/>

                            <TouchableOpacity
                                onPress={() => navigate("Login")}>

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
