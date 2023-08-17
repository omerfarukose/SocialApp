import {
    Image, Keyboard, KeyboardAvoidingView, Platform, Text,
    TouchableOpacity, TouchableWithoutFeedback, View,
} from "react-native";
import { useContext, useState } from "react";
import { MyButton } from "../../components/MyButton";
import { MyTextInput } from "../../components/Input/MyTextInput";
import { validateEmail } from "../../helper/functions/MyHelperFunctions";
import { navigate } from "../Router/RootNavigation";
import { SignIn } from "../../helper/functions/firebase/Auth";
import { GetUserInfoByEmail, GetUserInfoByUsername } from "../../helper/functions/firebase/Firestore";
import { ThemeContext } from "../../contexts/ThemeContext";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { UserContext } from "../../contexts/UserContext";
import { MyMainLayout } from "../../components/MainLayout/MyMainLayout";
import SyncStorage from 'sync-storage';
import Toast from 'react-native-toast-message';

export const LoginScreen = (props) => {
    
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
    
    const _signIn = (mail) => {
        
        // firebase authentication email & password login method
        SignIn(mail, password)
            .then(() => {
                setPassword("");
                setEmail("");
                
                // get user info to setting user context
                // set likes & posts to check is post exist in likes & posts list
                GetUserInfoByEmail(mail)
                    .then((userInfo) => {
                        
                        // set local user id & name
                        SyncStorage.set('userId', userInfo.id);
                        SyncStorage.set('username', userInfo.username);
                        
                        setUserAvatar(userInfo.avatar);
                        setUserLikes(userInfo.likes);
                        setUserPosts(userInfo.posts);
                    })
                
                navigate("HomeTabs")
            })
            .catch(() => {
                showToast("Kullanıcı Adı & Parola hatalı");
            })
    }

    const _handleLoginPress = ( ) => {

        if (validateEmail(email)) {

            if (password) {

                _signIn(email);

            } else {
                // show password alert !
                showToast("Parola Giriniz");
            }

        } else {
            
            // check username if e-mail is not valid
            GetUserInfoByUsername(email)
                .then((userInfo) => {
                    // sign in
                    _signIn(userInfo.email);
                })
                .catch((error) => {
                    // show username alert !
                    showToast("Kullanıcı Bulunamadı");
                })

        }

    }

    return(
        <MyMainLayout 
            showNavbar={false}
            mainViewStyle={{
                backgroundColor: theme.secondColor
            }}>
            
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                    flex: 1,
                    backgroundColor: theme.secondColor,
                }}>

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
                                placeholder={"Kullanıcı Adı & E-mail"}/>

                            <MyTextInput
                                value={password}
                                setValue={setPassword}
                                secureText
                                placeholder={"Parola"}/>

                            <MyButton
                                title={"Giriş"}
                                onPress={() => _handleLoginPress()}
                                style={{
                                    backgroundColor: theme.mainColor,
                                    width: wp(30),
                                    alignItems: "center"
                                }}/>

                            <TouchableOpacity onPress={() => navigate("SignUp")}>

                                <Text
                                    style={{ color: "white" }}>

                                    Hesabın yok mu? Hesap Oluştur!

                                </Text>

                            </TouchableOpacity>

                        </View>

                    </View>

                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        
        </MyMainLayout>
    )
}
