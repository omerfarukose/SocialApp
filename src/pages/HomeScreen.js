import { MyCardView } from "../components/MyCardView";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, FlatList, RefreshControl, View} from "react-native";
import { GetAllPosts } from "../helper/functions/firebase/Firestore";
import {MyActivityIndicator} from "../components/MyActivityIndicator";

export const HomeScreen = (props) => {

    const [postList, setPostList] =  useState([]);
    const [isReady, setIsReady] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
    useEffect(() => {
        /*_getPosts();*/
    }, [props])
    
    const _getPosts = ( ) => {
        GetAllPosts()
            .then((res) => {
                setPostList(res);
                setIsReady(true)
            })
    }
    
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        
        GetAllPosts()
            .then((res) => {
                setPostList(res);
                setRefreshing(false);
            })
    }, []);

    return(
        <MyMainLayout>
            
            {
                isReady ?
                    
                    <FlatList
                        overScrollMode={"never"}
                        data={postList}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        renderItem={({item}) => <MyCardView postId={item.data().id}/>}
                        keyExtractor={(item, index) => item.id}/>
                    
                    :
                    
                    <MyActivityIndicator/>
            }



        </MyMainLayout>
    )
}
