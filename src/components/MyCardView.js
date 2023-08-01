import { Image, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppColors } from "../values/Colors";
import { MyIconButton } from "./MyIconButton";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { UserInfo } from "../helper/functions/UserInfo";
import { post } from "axios";
import { GetUserInfoById } from "../helper/functions/firebase/Firestore";

export const MyCardView = ( props ) => {

    let { cardData } = props;
    console.log("card data : ", cardData);

    const [username, setUsername] = useState("");
    const [avatarUri, setAvatarUri] = useState("");

    useEffect(() => {

        GetUserInfoById(cardData.userId)
            .then((res) => {
                setUsername(res.username);
                setAvatarUri(res.avatar);
            })

    },[])

    const _getUserPotsList = async ( ) => {

        let userinfo = new UserInfo();
        let userId = await userinfo.GetUserId();

        let data = null;

        console.log("id : ", userId);

        await firestore()
            .collection('Users')
            .where('id', '==', userId)
            .get()
            .then(querySnapshot => {
                let userInfo = querySnapshot.docs[0].data();
                console.log("user card info : ", userInfo);

                data = userInfo;
            });

        return data;
    }

    const _handleRepost = async ( ) => {

        let userInfo = await _getUserPotsList();

        console.log("userInfo.posts : ",userInfo.posts);
        console.log("cardData.id : ",cardData.id);

        let postList = []

        if (postList.includes(cardData.id)) {
            // TODO: remove from list
            console.log("remove from list !!!!");
        } else {
            if (userInfo.posts) {
                postList = [...userInfo.posts, cardData.id]
            } else {
                postList.push(cardData.id)
            }
        }

        console.log("postList : ", postList);

        console.log("handle post info : ", userInfo);

        firestore()
            .collection('Users')
            .doc(userInfo.id)
            .update({
                'posts': postList,
            })
            .then(() => {
                console.log('User updated!');
            });
    }

    return(
        <View
            style={{
                padding: 10,
                paddingTop: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#d7d5d5",
                backgroundColor: "white",
            }}>

            {/*image & text*/}
            <View
                style={{
                    flexDirection: "row",
                    marginBottom: 20,
                    alignItems: "flex-start",
                }}>

                <Image
                    source={{uri: avatarUri}}
                    style={{
                        width: 60,
                        height: 60,
                        borderRadius: 99,
                        borderWidth: 1,
                        borderColor: AppColors.mainColor,
                    }}/>

                <View>

                    <Text
                        style={{
                            flex: 1,
                            paddingLeft: 10,
                            paddingTop: 0,
                            fontWeight: "bold",
                            fontSize: 20,
                        }}>

                        { username }

                    </Text>

                    <Text
                        style={{
                            flex: 1,
                            padding: 10,
                            paddingTop: 0,
                            fontWeight: "400",
                            fontSize: 15,
                        }}>

                        { cardData.text }

                    </Text>


                </View>

            </View>

            {/*button group*/}
            <View
                style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                }}>

                <MyIconButton
                    onPress={() => _handleRepost()}
                    iconName={"retweet"}/>

                <MyIconButton
                    iconName={"heart"}/>

            </View>

        </View>
    )
}
