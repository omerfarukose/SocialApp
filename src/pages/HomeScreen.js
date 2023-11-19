import React, { useCallback, useEffect, useState, useContext } from "react";
import { MyCardView } from "../components/MyCardView";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { FlatList, RefreshControl } from "react-native";
import { GetAllPosts } from "../helper/functions/firebase/Firestore";
import { MyActivityIndicator } from "../components/MyActivityIndicator";
import { MyNoDataView } from "../components/MyNoDataView";
import { MyButton } from "../components/MyButton";
import { CommonContext } from "../contexts/CommonContext";

export const HomeScreen = () => {

    const [postList, setPostList] =  useState([]);
    const [isReady, setIsReady] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    let {setIsDeleteModalVisible} = useContext(CommonContext);
    
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

            <MyButton
                onPress={() => setIsDeleteModalVisible(true)}/>
            
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
