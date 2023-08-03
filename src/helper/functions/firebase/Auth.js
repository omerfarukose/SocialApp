import auth from "@react-native-firebase/auth";
import { navigate } from "../../../pages/Router/RootNavigation";

export function SignUp(email, password) {
    console.log('Auth : SignUp - email : ', email);
    console.log('Auth : SignUp - password : ', password);

    return new Promise(((resolve, reject) => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Auth : SignUp - success');
                resolve();
            })
            .catch(error => {
                console.log('Auth : SignUp error : ', error);
                reject(error.code);
            });
    }))
}

export function SignIn(email, password) {
    console.log('Auth : SignIn - email : ', email);
    console.log('Auth : SignIn - password : ', password);

    return new Promise(((resolve, reject) => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Auth : SignIn - success');
                resolve();
            })
            .catch(error => {
                console.log('Auth : SignIn error : ', error);
                reject(error.code);
            });
    }))
}

export function Logout() {
    console.log('Auth : Logout');

    return new Promise(((resolve, reject) => {
        auth()
            .signOut()
            .then(() => {
                console.log('Auth : Logout - success');
                resolve();
            })
            .catch((error) => {
                console.log('Auth : Logout error : ', error);
                reject();
            })
    }))
}
