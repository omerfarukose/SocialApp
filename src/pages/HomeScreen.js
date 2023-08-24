import { MyCardView } from "../components/MyCardView";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import React, { useCallback, useEffect, useState } from "react";
import {FlatList, RefreshControl} from "react-native";
import { GetAllPosts } from "../helper/functions/firebase/Firestore";
import { MyActivityIndicator } from "../components/MyActivityIndicator";
import {MyNoDataView} from "../components/MyNoDataView";

export const HomeScreen = () => {

    const [postList, setPostList] =  useState([]);
    const [isReady, setIsReady] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
    useEffect(() => {
        // get all posts
        _getPosts();
    }, [])
    
    const _getPosts = ( ) => {
        GetAllPosts()
            .then((res) => {
                setPostList(res);
                setIsReady(true);
            })
    }
    
    // swipe to refresh function
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
                    
                    postList.length > 0 ?
                        
                        <FlatList
                            overScrollMode={"never"}
                            data={postList}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            renderItem={({item}) => <MyCardView postId={item.data().id}/>}
                            keyExtractor={(item, index) => item.id}/>
                        
                        :
                        
                        <MyNoDataView/>
                    
                    :
                    
                    <MyActivityIndicator/>
            }



        </MyMainLayout>
    )
}
