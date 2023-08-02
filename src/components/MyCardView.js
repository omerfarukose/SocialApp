import { Image, Text, View } from "react-native";
import { AppColors } from "../values/Colors";
import { MyIconButton } from "./MyIconButton";
import { useEffect, useState } from "react";
import { GetUserInfoById, HandleRepost } from "../helper/functions/firebase/Firestore";

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

    const _handleRepost = async ( ) => {
        HandleRepost(cardData.id)
            .then(() => {
                console.log("_handleRepost then");
            })
            .catch(() => {
                console.log("_handleRepost catch");
            })
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
