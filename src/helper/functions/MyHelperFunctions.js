import moment from "moment/moment";

export const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};


export const removePunctuation = (text) => {
    let punctuation = /[\.,?!]/g;
    let newText = text.replace(punctuation, "");
    return newText;
}


export const _calculateTime  = ( time ) => {
    return moment(time, "MMMM Do YYYY, h:mm:ss a").fromNow()
}

export const GetTime = ( ) => {
    return moment().format('MMMM Do YYYY, h:mm:ss a');
}
