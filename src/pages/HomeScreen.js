import { MyCardView } from "../components/MyCardView";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import React, { useEffect, useState } from "react";
import {ActivityIndicator, FlatList, View} from "react-native";
import { GetAllPosts } from "../helper/functions/firebase/Firestore";

export const HomeScreen = (props) => {

    const [postList, setPostList] =  useState([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        
        GetAllPosts()
            .then((res) => {
                setPostList(res);
                setIsReady(true)
            })
        
    }, [props])

    return(
        <MyMainLayout>
            
            {
                isReady ?
                    
                    <FlatList
                        overScrollMode={"never"}
                        data={postList}
                        renderItem={({item}) => <MyCardView postId={item.data().id}/>}
                        keyExtractor={(item, index) => item.id}/>
                    
                    :
                    
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        
                        <ActivityIndicator size={"large"}/>
                    
                    </View>
            }



        </MyMainLayout>
    )
}
