import { ScrollView, Text } from "react-native";
import { MyCardView } from "../components/MyCardView";
import { MyMainLayout } from "../components/MainLayout/MyMainLayout";
import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';

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

            {
                postList.length > 0 &&
                postList.map((item) => {
                    console.log("item : ", item.data().value);
                    return(
                        <MyCardView cardData={item.data()}/>
                    )
                })
            }

        </MyMainLayout>
    )
}
