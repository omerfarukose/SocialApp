import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from "react-native";
import { MyTextInput } from "../components/Input/MyTextInput";
import { useContext, useState } from "react";
import { heightPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { MyButton } from "../components/MyButton";
import firestore from '@react-native-firebase/firestore';
import { UserContext } from "../contexts/UserContext";

export const  AddPostScreen = ( ) => {

    const [post, setPost] = useState("")

    let {username} = useContext(UserContext)

    const _handleAddPost = ( ) => {

        firestore()
            .collection('Posts')
            .add({
                id: 0,
                username: username,
                value: post
            })
            .then(() => {
                console.log('Post added!');
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
