import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from "react-native";
import { MyTextInput } from "../components/Input/MyTextInput";
import { useState } from "react";
import { heightPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MyButton } from "../components/MyButton";
import { navigate } from "./Router/RootNavigation";
import Toast from "react-native-toast-message";
import { CreatePost } from "../helper/functions/firebase/Firestore";

export const  AddPostScreen = ( ) => {

    const [post, setPost] = useState("")

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
        <MyMainLayout
            layoutStyle={{
                padding: 20,
            }}>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1}}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "space-evenly"
                        }}>

                        <MyTextInput
                            value={post}
                            setValue={setPost}
                            placeholder={"Post Mesajı..."}
                            inputStyle={{
                                borderWidth: 1,
                                borderColor: "gray",
                                alignSelf: "center",
                                textAlignVertical: "top",
                                height: heightPercentageToDP(40),
                            }}/>

                        <MyButton
                            onPress={() => _handleAddPost()}
                            title={"Paylaş"}
                            style={{
                                width: wp(30),
                                alignItems: "center",
                                justifyContent: "center"
                            }}/>

                    </View>

                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>

        </MyMainLayout>
    )
}
