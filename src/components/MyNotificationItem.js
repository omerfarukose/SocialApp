import {Image, Text, TouchableOpacity, View} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {navigate} from "../pages/Router/RootNavigation";
import React, {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../contexts/ThemeContext";
import {GetUserInfoById} from "../helper/functions/firebase/Firestore";

export const MyNotificationItem = ( props ) => {
    
    let { data, onNotificationPress } = props;
    
    console.log("data : ", data) // -> omer
    
    let { theme } = useContext(ThemeContext);
    
    const [avatar, setAvatar] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png");
    const [notificationText, setNotificationText] = useState("");
    const [time, setTime] = useState("1 saat önce");
    
    useEffect(() => {
        
        GetUserInfoById(data.userId)
            .then((userInfo) => {
                setAvatar(userInfo.avatar);
                
                _setNotificationText(userInfo.username)
            })
        
    },[])
    
    const _setNotificationText = ( username ) => {
        
        switch (data.type) {
            case "like":
                setNotificationText(username + " postunu beğendi");
                break;
            case "repost":
                setNotificationText(username + " postunu paylaştı");
                break;
            case "follow":
                setNotificationText(username + " seni takip ediyor");
                break;
        }
    }
    
    return(
        <TouchableOpacity
            onPress={onNotificationPress}
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                paddingHorizontal: wp(5),
                paddingVertical: wp(3),
                borderBottomColor: "#eceff1",
                borderBottomWidth: 1,
            }}>
            
            {/*image*/}
            <TouchableOpacity
                onPress={() => navigate("UserProfile", {userId: data.userId})}>
                
                <Image
                    source={{uri: avatar}}
                    style={{
                        width: wp(15),
                        height: wp(15),
                        borderRadius: 999,
                        borderWidth: 2,
                        borderColor: theme.mainColor,
                    }}/>
            
            </TouchableOpacity>
            
            
            {/*notification content*/}
            <View
                style={{
                    flex: 1,
                    marginLeft: wp(3)
                }}>
                
                <Text
                    style={{
                        fontSize: hp(1.8)
                    }}>
                    
                    { notificationText }
                
                </Text>
            
            </View>
            
            {/*saat*/}
            <Text
                style={{
                    fontSize: hp(1.5)
                }}>
                
                {time}
                
            </Text>
        
        </TouchableOpacity>
    )
}
