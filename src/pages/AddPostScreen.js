import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from "react-native";
import { MyTextInput } from "../components/Input/MyTextInput";
import { useContext, useEffect, useState } from "react";
import { heightPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MyButton } from "../components/MyButton";
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts/UserContext";
import { navigate } from "./Router/RootNavigation";
import Toast from "react-native-toast-message";
import { UserInfo } from "../helper/functions/UserInfo";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const  AddPostScreen = ( ) => {

    const [post, setPost] = useState("")

    let {username, userId} = useContext(UserContext);

    const showToast = (text, type = "success") => {
        Toast.show({
            type: type,
            text2: text
        });
    }

    const _handleAddPost = async ( ) => {

        let userInfo = new UserInfo();
        let userId = await userInfo.GetUserId();
        let postId = uuid.v4();

        console.log("user id for post : ", userId);

        firestore()
            .collection('Posts')
            .add({
                id: postId,
                text: post,
                userId: userId
            })
            .then(() => {
                console.log('Post added!');

                setPost("");

                showToast("Post paylaşıldı !");

                navigate("Home");
            });

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
