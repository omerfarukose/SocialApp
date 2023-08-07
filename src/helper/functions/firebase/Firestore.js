import firestore from "@react-native-firebase/firestore";
import { GetUserId } from "../UserInfo";
import uuid from "react-native-uuid";
import storage from "@react-native-firebase/storage";

// - - - USERS COLLECTION FUNCTIONS - - -

export async function CreateUser(username, email) {
    let userId  = uuid.v4();

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
                console.log('Firestore : CreateUser - success');
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

export function GetCurrentUserInfo() {
    let userId = GetUserId();
    console.log("Firestore : GetCurrentUserInfo local userId - ", userId);

    return new Promise(((resolve, reject) => {
        GetUserInfoById(userId)
            .then((res) => {
                console.log("Firestore : GetCurrentUserInfo userId - ", userId);
                resolve(res);
            })
            .catch((err) => {
                console.log("Firestore :  GetCurrentUserInfo error : ", err);
                reject(err);
            })
    }))
}

export function HandleRepost(postId) {
    console.log("Firestore : HandleRepost postId - ", postId);

    return new Promise(((resolve, reject) => {
        GetCurrentUserInfo()
            .then((userInfo) => {
                let currentPostList = userInfo.posts;
                let finalPostList = [];

                if (currentPostList.includes(postId)) {
                    // TODO: already reposted - remove from list
                    console.log("Firestore : HandleRepost - already reposted remove from list");

                } else {

                    if (currentPostList) {
                        finalPostList = [...currentPostList, postId]
                    } else {
                        finalPostList.push(postId)
                    }

                    let updateData = {
                        'posts' : finalPostList
                    }

                    UpdateUserParameter(userInfo.id, updateData)
                        .then(() => {
                            console.log("Firestore : HandleRepost - success");
                            resolve();
                        })
                        .catch(() => {
                            console.log("Firestore : HandleRepost - error");
                            reject();
                        })

                }

            })
            .catch(() => {
                reject();
            })
    }))
}

function UpdateUserParameter(userId, data){
    console.log("Firestore : UpdateUserParameter userId - ", userId);
    console.log("Firestore : UpdateUserParameter data - ", data);

    return new Promise(((resolve, reject) => {
        firestore()
            .collection('Users')
            .doc(userId)
            .update(data)
            .then(() => {
                console.log("Firestore : UpdateUserParameter - success");
                resolve();
            })
            .catch((error) => {
                console.log("Firestore : UpdateUserParameter error : ", error);
                reject();
            })
    }))
}

export async function HandleFollow(userIdToFollow){
    console.log("Firestore : HandleFollow userIdToFollow - ", userIdToFollow);

    return new Promise(((resolve, reject) => {
        GetCurrentUserInfo()
            .then((userInfo) => {
                let currentFollowingList = userInfo.following;
                let finalFollowingList = [];
                
                if (currentFollowingList.includes(userIdToFollow)) {
                    // TODO: already reposted - remove from list
                    console.log("Firestore : HandleRepost - already reposted remove from list");

                } else {

                    if (currentFollowingList) {
                        finalFollowingList = [...currentFollowingList, userIdToFollow]
                    } else {
                        finalFollowingList.push(userIdToFollow)
                    }

                    let updateData = {
                        "following" : finalFollowingList
                    }

                    UpdateUserParameter(userInfo.id, updateData)
                        .then(() => {
                            console.log("Firestore : HandleFollow - success");

                            UpdateUserFollowerList(userIdToFollow, userInfo.id)
                                .then(() => {
                                    resolve();
                                })
                                .catch(() => {
                                    reject();
                                })
                        })
                        .catch(() => {
                            console.log("Firestore : HandleFollow - error");
                            reject();
                        })

                }

            })
            .catch(() => {
                reject();
            })
    }))
}

export async function UpdateUserFollowerList(userId, followerUser) {
    console.log("Firestore : UpdateUserFollowerList userId - ", userId);

    return new Promise(((resolve, reject) => {
        GetUserInfoById(userId)
            .then((userInfo) => {
                let currentFollowerList = userInfo.followers;
                let finalFollowerList = [];

                if (currentFollowerList.includes(userInfo.id)) {
                    // TODO: already reposted - remove from list
                    console.log("Firestore : HandleRepost - already reposted remove from list");

                } else {

                    if (currentFollowerList) {
                        finalFollowerList = [...currentFollowerList, followerUser]
                    } else {
                        finalFollowerList.push(followerUser)
                    }

                    let updateData = {
                        'followers' : finalFollowerList
                    }

                    UpdateUserParameter(userInfo.id, updateData)
                        .then(() => {
                            console.log("Firestore : HandleFollow - success");
                            resolve();
                        })
                        .catch(() => {
                            console.log("Firestore : HandleFollow - error");
                            reject();
                        })

                }

            })
            .catch(() => {
                reject();
            })
    }))
}

export async function UpdateUserProfileImage(uri){
    let userId = GetUserId();
    
    return new Promise(((resolve, reject) => {
        
        const task = storage()
            .ref(userId)
            .putFile(uri);
        
        // set progress state
        task.on('state_changed', async snapshot => {
            
            if(snapshot.state === "success") {
                const url = await storage().ref(userId).getDownloadURL();
                
                let data  = {
                    'avatar' : url
                }
                
                UpdateUserParameter(userId, data)
                    .then(() => {
                        console.log("Firestore : UpdateUserProfileImage - success");
                        resolve(url);
                    })
                    .catch(() => {
                        console.log("Firestore : UpdateUserProfileImage - error");
                        reject();
                    })
            }
            
        });
    }))
}

// - - - POSTS COLLECTION FUNCTIONS - - -

export function GetAllPosts() {
    console.log("Firestore : GetAllPosts");

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

export function CreatePost(text) {
    let userId = GetUserId();
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
            .doc(postId.toString())
            .set(postData)
            .then(() => {
                console.log('Firestore : CreatePost - success');
                resolve();
            })
            .catch((err) => {
                console.log("Firestore : CreatePost error : ", err);
                reject(err);
            })
    }))
}

export function GetPostDataById(postId) {
    console.log("Firestore : GetPostDataById  postId - ", postId);

    return new Promise(((resolve, reject) => {
        firestore()
            .collection('Posts')
            .where('id', '==', postId)
            .get()
            .then(querySnapshot => {
                let postData = querySnapshot.docs[0].data();
                console.log("Firestore : GetPostDataById - response : ", postData);

                resolve(postData);
            })
            .catch((err) => {
                console.log("Firestore : GetPostDataById error : ", err);
                reject(err);
            })
    }))
}
