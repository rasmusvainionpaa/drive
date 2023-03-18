import base64 from "base-64";

interface DirectoryUrl {
    url: string;
    name: string;
}

/**
 * Creates an array of objects with url and name
 * @param url string array of url parts
 * @returns array of objects with url and name
 */
export default function createUrlArray(rawUrl: string): DirectoryUrl[] {
    const urlArray: DirectoryUrl[] = [];

    console.log("Raw url: ", rawUrl)

    const url = rawUrl.split("/")

    console.log("Splitted url: ", url)

    let tempObj: DirectoryUrl = {
        url: "",
        name: ""
    };

    let tempString = "";

    for (let i = 0; i < url.length; i++) {

        for (let j = i; 0 < j; j--) {
            tempString = "/" + url[j]! + tempString;

        }

        tempObj.url = tempString;
        tempObj.name = url[i]!;

        // add new object to array
        urlArray.push(tempObj);

        // reset tempObject
        tempObj = {
            url: "",
            name: ""
        };

        tempString = ""

    }
    return urlArray;
}