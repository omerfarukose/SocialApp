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
import { AppColors } from "../../values/Colors";
import { useContext, useState } from "react";
import { MyTextInput } from "../../components/Input/MyTextInput";
import { MyButton } from "../../components/MyButton";
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { navigate } from "../Router/RootNavigation";
import { validateEmail } from "../../helper/functions/MyHelperFunctions";
import firestore from "@react-native-firebase/firestore";
import { UserContext } from "../../contexts/UserContext";


export const SignUpScreen = ( ) => {

    const [myUsername, setMyUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let { setUsername } = useContext(UserContext)

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

                        auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            console.log('User account created & signed in!');

                            setUsername(myUsername);

                            firestore()
                                .collection('Users')
                                .add({
                                    username: myUsername,
                                })
                                .then(() => {
                                    console.log('Post added!');
                                });

                            showToast("Kullanıcı Oluşturuldu", "success");
                            navigate("Login");
                        })
                        .catch(error => {
                            if (error.code === 'auth/email-already-in-use') {
                                console.log('That email address is already in use!');

                                showToast("E-mail adresi zaten kullanılıyor");
                            }

                            if (error.code === 'auth/invalid-email') {
                                console.log('That email address is invalid');
                                showToast("Geçersiz e-mail");
                            }

                            console.error(error);
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
