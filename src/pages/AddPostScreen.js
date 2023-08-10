import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";
import { MyTextInput } from "../components/Input/MyTextInput";
import {useContext, useEffect, useState} from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MyButton } from "../components/MyButton";
import {goBack, navigate} from "./Router/RootNavigation";
import Toast from "react-native-toast-message";
import { CreatePost } from "../helper/functions/firebase/Firestore";
import {ThemeContext} from "../contexts/ThemeContext";

export const  AddPostScreen = ( ) => {

    const {theme} = useContext(ThemeContext);
    
    const [post, setPost] = useState("");

    const showToast = (text, type = "success") => {
        Toast.show({
            type: type,
            text2: text
        });
    }

    const _handleAddPost = async ( ) => {
        CreatePost(post)
            .then(() => {
                setPost("");

                showToast("Post paylaşıldı !");
                navigate("Home");
            })
    }

    return(
        <MyMainLayout>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1}}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                        }}>
                        
                        {/*button group*/}
                        <View
                            style={{
                                width: "80%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginVertical: hp(3)
                            }}>
                            
                            <MyButton
                                onPress={() => {
                                    goBack();
                                    setPost("");
                                }}
                                title={"İptal"}
                                textStyle={{
                                    fontWeight: "bold",
                                    color: "red",
                                }}
                                style={{
                                    width: wp(30),
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "white",
                                    borderColor: "red",
                                    borderWidth: 1
                                }}/>
                            
                            <MyButton
                                onPress={() => _handleAddPost()}
                                title={"Paylaş"}
                                textStyle={{
                                    fontWeight: "bold",
                                    color: theme.mainColor,
                                }}
                                style={{
                                    width: wp(30),
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "white",
                                    borderColor: theme.mainColor,
                                    borderWidth: 1
                                }}/>
                            
                        </View>
                        
                        {/*input*/}
                        <MyTextInput
                            value={post}
                            multiline={true}
                            setValue={setPost}
                            placeholder={"Post Mesajı..."}
                            inputStyle={{
                                justifyContent: "flex-start",
                                height: hp(40),
                            }}/>

                    </View>

                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

        </MyMainLayout>
    )
}
