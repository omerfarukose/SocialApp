import {MyMainLayout} from "../components/MainLayout/MyMainLayout";
import {FlatList, RefreshControl} from "react-native";
import React, {useEffect, useState} from "react";
import {GetCurrentUserInfo} from "../helper/functions/firebase/Firestore";
import {MyNotificationItem} from "../components/MyNotificationItem";

export const NotificationsScreen = ( ) => {
    
    const [refreshing, setRefreshing] = useState(false);
    const [notificationList, setNotificationList] = useState([]);
    
    useEffect(() => {
        GetCurrentUserInfo()
            .then((userInfo) => {
                setNotificationList(userInfo.notifications);
            })
    }, [])
    
    const onRefresh = ( ) => {
        setRefreshing(true);
        
        GetCurrentUserInfo()
            .then((userInfo) => {
                setNotificationList(userInfo.notifications);
                setRefreshing(false);
            });
    }
    
    return(
        <MyMainLayout>
            
            <FlatList
                overScrollMode={"never"}
                data={notificationList}
                extraData={notificationList}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={({item}) => <MyNotificationItem data={item}/>}
                keyExtractor={(item, index) => item}/>
            
        </MyMainLayout>
    )
}
