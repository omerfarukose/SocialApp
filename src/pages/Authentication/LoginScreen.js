import {
    Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text,
    TouchableOpacity, TouchableWithoutFeedback, View,
} from "react-native";
import { useContext, useState } from "react";
import { MyButton } from "../../components/MyButton";
import { MyTextInput } from "../../components/Input/MyTextInput";
import Toast from 'react-native-toast-message';
import { validateEmail } from "../../helper/functions/MyHelperFunctions";
import { navigate } from "../Router/RootNavigation";
import { SignIn } from "../../helper/functions/firebase/Auth";
import { GetUserInfoByEmail } from "../../helper/functions/firebase/Firestore";
import { ThemeContext } from "../../contexts/ThemeContext";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import SyncStorage from 'sync-storage';
import {UserContext} from "../../contexts/UserContext";

export const LoginScreen = ({navigation}) => {

    let { theme } = useContext(ThemeContext);
    let { setUserAvatar, setUserLikes, setUserPosts } = useContext(UserContext);


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

                SignIn(email, password)
                    .then(() => {
                        setPassword("");
                        setEmail("");

                        GetUserInfoByEmail(email)
                            .then((userInfo) => {
                                SyncStorage.set('userId', userInfo.id);
                                SyncStorage.set('username', userInfo.username);
                                console.log("login user info : ", userInfo)
                                setUserAvatar(userInfo.avatar);
                                setUserLikes(userInfo.likes);
                                setUserPosts(userInfo.posts);
                            })

                        navigate("HomeTabs")
                    })
                    .catch(() => {
                        showToast("Kullanıcı Adı & Parola hatalı");
                    })

            } else {
                // show password alert !
                showToast("Parola Giriniz");
            }

        } else {
            // show username alert !
            showToast("Geçersiz E-mail");
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
                                style={{
                                    backgroundColor: theme.mainColor,
                                    width: wp(30),
                                    alignItems: "center"
                                }}
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
