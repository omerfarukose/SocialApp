import { Image, Text, TouchableOpacity, View } from "react-native";
import { MyIconButton } from "./MyIconButton";
import { useContext, useEffect, useState } from "react";
import { GetPostDataById, GetUserInfoById, HandleRepost } from "../helper/functions/firebase/Firestore";
import { navigate } from "../pages/Router/RootNavigation";
import { ThemeContext } from "../contexts/ThemeContext";

export const MyCardView = ( props ) => {

    let { postId } = props;

    let { theme } = useContext(ThemeContext);

    const [userId,setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [avatarUri, setAvatarUri] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");
    const [cardText, setCardText] = useState("");

    useEffect(() => {

        GetPostDataById(postId)
            .then((postData) => {
                setCardText(postData.text)

                GetUserInfoById(postData.userId)
                    .then((res) => {
                        setUsername(res.username);
                        setAvatarUri(res.avatar);
                        setUserId(res.id);
                    });

            });

    },[])

    const _handleRepost = async ( ) => {
        HandleRepost(postId)
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

                <TouchableOpacity
                    onPress={() => navigate("UserProfile", {userId: userId})}>

                    <Image
                        source={{uri: avatarUri}}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 99,
                            borderWidth: 1,
                            borderColor: theme.mainColor,
                        }}/>

                </TouchableOpacity>

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

                        { cardText }

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
