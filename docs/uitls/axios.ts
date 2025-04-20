import axios,{AxiosRequestConfig} from "axios";

const instance = axios.create({
    // baseURL: '',
    timeout: 60000,
    // headers: {'X-Custom-Header': 'foobar'}
});
export const getReq =  async function(url:string,config?:AxiosRequestConfig) {
    const res = await instance.get(url,config);
    if(res.status===200){
        return res.data
    }else{
        console.error(res.statusText);
        return res
    }
}
export const postReq = async function(url:string,config?:AxiosRequestConfig) {
    const res = await instance.post(url,config);
    if(res.status===200){
        return res.data
    }else{
        console.error(res.statusText);
        return res
    }
}