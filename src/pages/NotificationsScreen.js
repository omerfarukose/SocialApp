import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { FlatList, RefreshControl, Modal, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MyNotificationItem } from "../components/MyNotificationItem";
import { MyNoDataView } from "../components/MyNoDataView";
import { GetCurrentUserInfo } from "../helper/functions/firebase/Firestore";
import { MyActivityIndicator } from "../components/MyActivityIndicator";
import { MyCardView } from "../components/MyCardView";

export const NotificationsScreen = ( ) => {
    
    const [refreshing, setRefreshing] = useState(false);
    const [notificationList, setNotificationList] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [isPostDetailModalVisible, setIsPostDetailModalVisible] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState("");
    
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
                    
                    notificationList && notificationList.length > 0 ?
                        
                        <FlatList
                            overScrollMode={"never"}
                            data={notificationList}
                            extraData={notificationList}
                            keyExtractor={(item, index) => item}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            renderItem={({item}) => {
                                return(
                                    <MyNotificationItem
                                        data={item}
                                        onNotificationPress={() => {
                                            setSelectedPostId(item?.postId)
                                            setIsPostDetailModalVisible(true)
                                        }}/>
                                )
                                
                            }}/>
                        
                        :
                        
                        <MyNoDataView/>
                    
                    :
                    
                    <MyActivityIndicator/>
            }
            
            <Modal
                transparent={true}
                visible={isPostDetailModalVisible}>
                
                {/*full screen view*/}
                <TouchableOpacity
                    onPress={() => setIsPostDetailModalVisible(false)}
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(52, 52, 52, 0.9)', // transparent background,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    
                    <MyCardView postId={selectedPostId}/>
                    
                </TouchableOpacity>
            
            </Modal>
            
        </MyMainLayout>
    )
}
