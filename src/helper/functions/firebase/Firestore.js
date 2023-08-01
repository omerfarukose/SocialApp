import firestore from "@react-native-firebase/firestore";
import { GetUserId } from "../UserInfo";
import uuid from "react-native-uuid";

// - - - USERS COLLECTION FUNCTIONS - - -

export async function CreateUser(username, email) {
    let userId = await GetUserId();

    let userData = {
        id: userId,
        username: username,
        email: email,
        avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        followers: [],
        following: [],
        posts: [],
        likes: [],
    }

    console.log('Firestore : CreateUser - user data : ', userData);

    return new Promise(((resolve, reject) => {
        firestore()
            .collection('Users')
            .doc(userId.toString())
            .set(userData)
            .then(() => {
                console.log('Firestore : CreateUser - user created');
                resolve();
            })
            .catch((err) => {
                console.log('Firestore : CreateUser error : ', err);
                console.log(err);
                reject(err);
            })
    }))
}

export function GetUserInfoByEmail(email) {
    console.log("Firestore : GetUserInfoByEmail email - ", email);

    return new Promise(((resolve, reject) => {
        firestore()
            .collection('Users')
            .where('email', '==', email)
            .get()
            .then(querySnapshot => {
                let userInfo = querySnapshot.docs[0].data();
                console.log("Firestore : GetUserInfoByEmail - response : ", userInfo);

                resolve(userInfo);
            })
            .catch((err) => {
                console.log("Firestore : GetUserInfoByEmail error : ", err);
                reject(err);
            })
    }))
}

export function GetUserInfoById(userId) {
    console.log("Firestore : GetUserInfoById userId - ", userId);

    return new Promise(((resolve, reject) => {
        firestore()
            .collection('Users')
            .where('id', '==', userId)
            .get()
            .then(querySnapshot => {
                let userInfo = querySnapshot.docs[0].data();
                console.log("Firestore : GetUserInfoById - response : ", userInfo);

                resolve(userInfo);
            })
            .catch((err) => {
                console.log("Firestore : GetUserInfoById error : ", err);
                reject(err);
            })
    }))
}

// - - - POSTS COLLECTION FUNCTIONS - - -

export function GetAllPosts() {

    return new Promise(((resolve, reject) => {
        firestore()
            .collection('Posts')
            .get()
            .then(querySnapshot => {
                let postList = querySnapshot.docs;
                console.log("Firestore : GetAllPosts - response : ", postList);

                resolve(postList);
            })
            .catch((err) => {
                console.log("Firestore :  GetAllPosts error : ", err);
                reject(err);
            })
    }))
}

export async function CreatePost(text) {
    let userId = await GetUserId();
    let postId = uuid.v4();

    let postData = {
        id: postId,
        text: text,
        userId: userId
    }

    console.log('Firestore : CreatePost - post data : ', postData);

    return new Promise(((resolve, reject) => {
        firestore()
            .collection('Posts')
            .add(postData)
            .then(() => {
                console.log('Firestore : CreatePost - post created');
                resolve();
            })
            .catch((err) => {
                console.log("Firestore : CreatePost error : ", err);
                reject(err);
            })
    }))
}
