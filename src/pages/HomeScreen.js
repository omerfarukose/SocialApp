import { MyCardView } from "../components/MyCardView";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { GetAllPosts } from "../helper/functions/firebase/Firestore";

export const HomeScreen = ( ) => {

    const [postList, setPostList] =  useState([]);

    useEffect(() => {
        GetAllPosts()
            .then((res) => {
                setPostList(res);
            })
    }, [])

    return(
        <MyMainLayout>

            <FlatList
                data={postList}
                renderItem={({item}) => <MyCardView cardData={item.data()}/>}
                keyExtractor={(item, index) => item.id}/>

        </MyMainLayout>
    )
}
