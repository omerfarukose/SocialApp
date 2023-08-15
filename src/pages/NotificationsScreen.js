import {MyMainLayout} from "../components/MainLayout/MyMainLayout";
import {FlatList, RefreshControl} from "react-native";
import React, {useEffect, useState} from "react";
import {GetCurrentUserInfo} from "../helper/functions/firebase/Firestore";
import {MyNotificationItem} from "../components/MyNotificationItem";
import {MyCardView} from "../components/MyCardView";
import {MyNoDataView} from "../components/MyNoDataView";
import {MyActivityIndicator} from "../components/MyActivityIndicator";

export const NotificationsScreen = ( ) => {
    
    const [refreshing, setRefreshing] = useState(false);
    const [notificationList, setNotificationList] = useState([]);
    const [isReady, setIsReady] = useState(false);
    
    
    useEffect(() => {
        GetCurrentUserInfo()
            .then((userInfo) => {
                setNotificationList(userInfo.notifications);
                setIsReady(true);
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
            
            {
                isReady ?
                    
                    notificationList.length > 0 ?
                        
                        <FlatList
                            overScrollMode={"never"}
                            data={notificationList}
                            extraData={notificationList}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            renderItem={({item}) => <MyNotificationItem data={item}/>}
                            keyExtractor={(item, index) => item}/>
                        
                        :
                        
                        <MyNoDataView/>
                    
                    :
                    
                    <MyActivityIndicator/>
            }
            
        </MyMainLayout>
    )
}
