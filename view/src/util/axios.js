import axios from 'axios'
import qs from "qs"


var instance = axios.create({
    baseURL: 'http://111.230.149.24:80/',
    method: 'post',
    transformRequest: [function (data, headers) {
        return qs.stringify(data)
    }],
    // withCredentials:true,//cookie值
})

export default instance