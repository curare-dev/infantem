import AWS from 'aws-sdk';
import * as SecureStore from "expo-secure-store";

const s3 = new AWS.S3({accessKeyId:'AKIAXIOOBQJ6RS4XSIMG', secretAccessKey:'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', region:'us-east-2'});

export const uploadImageOnS3 = async (file) => {
    console.log("Recibe Archivo: ", file);
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    const params = {Bucket: 'infantem-test', Key: `images/${userid}.jpg`, ContentType: 'image/jpeg', ACL: 'public-read'};
    s3.getSignedUrl('putObject', params, function (err, url) {
        console.log("ERR", err);
        console.log('Your generated pre-signed URL is', url);
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
            console.log("XHR: ", xhr.response);
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("Archivo subido exitoso");
                    // Successfully uploaded the file.
                } else {
                    console.log("Hubo un error ");
                    // The file could not be uploaded.
                }
            }
        }
    xhr.open('PUT', url)
    xhr.setRequestHeader('X-Amz-ACL', 'public-read')
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.send({ uri: file.uri, type: file.type, name: userid })
    });
}

export const downloadImageOnS3 = async () => {
    let userid = await SecureStore.getItemAsync("id");
    userid = userid.slice(1, -1);
    const params = {Bucket: 'infantem-test', Key: `images/${userid}.jpg`};
    // const imgURL = s3.getSignedUrl('getObject', params, function (err, url) {
    //     console.log('Your generated pre-signed URL is', url);
    // });
    const imgURL = s3.getSignedUrl('getObject', params);
    return imgURL;
}