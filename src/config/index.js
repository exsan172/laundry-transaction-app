import axios from "axios"

export const env = {
    api_url : "https://laundry-apiv1.herokuapp.com/",
    dev_url : "https://exsan-renaldhi.herokuapp.com"
}

export const GET = async (token, path, data) => {
    return await axios({
        url : env.api_url+path,
        method: "GET",
        headers: {
            "x-sange-token" : token
        },
        params : data
    })
}

export const POST = async (token, path, data) => {
    return await axios({
        url : env.api_url+path,
        method: "POST",
        headers: {
            "x-sange-token" : token
        },
        data : data
    })
}