import { Image, Text, TouchableOpacity, View } from "react-native";
import { MyIconButton } from "./MyIconButton";
import { useContext, useEffect, useState } from "react";
import {GetPostDataById, GetUserInfoById, HandleLike, HandleRepost} from "../helper/functions/firebase/Firestore";
import { navigate } from "../pages/Router/RootNavigation";
import { ThemeContext } from "../contexts/ThemeContext";
import {UserContext} from "../contexts/UserContext";

export const MyCardView = ( props ) => {

    let { postId } = props;

    let { theme } = useContext(ThemeContext);
    let { userPosts, userLikes } = useContext(UserContext);

    const [userId,setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [avatarUri, setAvatarUri] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");
    const [cardText, setCardText] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [isPosted, setIsPosted] = useState(false);

    useEffect(() => {

        GetPostDataById(postId)
            .then((postData) => {
                setCardText(postData.text)

                GetUserInfoById(postData.userId)
                    .then((userInfo) => {
                        setUsername(userInfo.username);
                        setAvatarUri(userInfo.avatar);
                        setUserId(userInfo.id);
                        
                        console.log("posts id : ", postId)
                        console.log("posts : ", userPosts)
                        console.log("likes : ", userPosts)
                        
                        setIsLiked(userLikes.includes(postId))
                        setIsPosted(userPosts.includes(postId))
                    });

            });

    },[])

    const _handleIconPress = async ( type ) => {
        switch (type) {
            case "repost":
                HandleRepost(postId)
                    .then(() => {
                        console.log("_handleRepost then");
                    })
                    .catch(() => {
                        console.log("_handleRepost catch");
                    })
                break;
            case "like":
                HandleLike(postId)
                    .then(() => {
                        console.log("_handleRepost then");
                    })
                    .catch(() => {
                        console.log("_handleRepost catch");
                    })
                break;
        }

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
                    onPress={() => _handleIconPress("repost")}
                    iconColor={isPosted ? theme.secondColor : "gray"}
                    iconName={"retweet"}/>

                <MyIconButton
                    onPress={() => _handleIconPress("like")}
                    iconColor={isLiked ? "red" : "gray"}
                    iconName={"heart"}/>

            </View>

        </View>
    )
}
