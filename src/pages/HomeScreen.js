import { MyCardView } from "../components/MyCardView";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import { FlatList } from "react-native";

export const HomeScreen = ( ) => {

    const [postList, setPostList] =  useState([]);

    useEffect(() => {

        getPostList();

    }, [])

    const getPostList = async ( ) => {

        const posts = await firestore().collection('Posts').get();
        console.log("post list : ", posts.docs[0].data());

        setPostList(posts.docs);
    }

    return(
        <MyMainLayout>

            <FlatList
                data={postList}
                renderItem={({item}) => <MyCardView cardData={item.data()}/>}
                keyExtractor={(item, index) => item.id}/>

        </MyMainLayout>
    )
}
