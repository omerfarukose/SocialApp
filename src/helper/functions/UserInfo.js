import SyncStorage from "sync-storage";

export function GetUserId(){
    return SyncStorage.get("userId");
}

export function SetUserId(id){
    SyncStorage.set("userId", id);
}

export function GetUserName(){
    return SyncStorage.get("username");
}

export function SetUsername(name){
    SyncStorage.set("username", name);
}
