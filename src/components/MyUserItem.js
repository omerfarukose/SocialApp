import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import {Image, Text, TouchableOpacity, View} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { navigate } from "../pages/Router/RootNavigation";
import { GetUserInfoById } from "../helper/functions/firebase/Firestore";
import { ThemeContext } from "../contexts/ThemeContext";
import Icon from "react-native-vector-icons/FontAwesome5";

export const MyUserItem = (params) => {

    let { userId, userInfo, showDelete, onDeletePress } = params;

    let { theme } = useContext(ThemeContext);

    console.log("MyUserItem userid : ", userId);
    console.log("MyUserItem userInfo : ", userInfo);

    const [avatar, setAvatar] = useState("https://cdn-icons-png.flaticon.com/512/1053/1053244.png");
    const [username, setUsername] = useState("");
    let id = userId || userInfo.id;
    
    useEffect(() => {
        if (userInfo) {
            setAvatar(userInfo.avatar);
            setUsername(userInfo.username);
        } else {
            GetUserInfoById(userId)
                .then((userInfo) => {
                    setAvatar(userInfo.avatar);
                    setUsername(userInfo.username);
                })
        }

    }, [])

    return(
        <TouchableOpacity
            onPress={() => navigate("UserProfile", {userId: id})}
            style={{
                backgroundColor: "white",
                height: hp(10),
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
            }}>

            <Image
                source={{uri: avatar}}
                style={{
                    width: hp(6),
                    height: hp(6),
                    marginHorizontal: hp(2),
                    borderRadius: 99,
                    borderWidth: 2,
                    borderColor: theme.mainColor,
                }}/>

            <Text
                style={{
                    fontSize: hp(2.6),
                    color: theme.mainColor,
                    flex: 1
                }}>

                { username }

            </Text>
            
            {
                showDelete &&
                
                <TouchableOpacity
                    onPress={onDeletePress}
                    style={{
                        marginRight: hp(3),
                    }}>
                    
                    <Icon name={"times"} size={hp(2.4)} color={"gray"} />
                
                </TouchableOpacity>
            }

        </TouchableOpacity>
    )
}
