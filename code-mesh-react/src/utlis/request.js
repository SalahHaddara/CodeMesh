import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

export const requestAPI =  async({route,method = 'GET' ,body,header='application/json'}) =>{
    //route like api file php
    //method post/get
    //body is data
    //ON PHP SET Authorization 
    try{
        const respons = await axios.request({
            url:`${route}`,
            method,
            data:body,
            headers:{
                'Content-Type': header,
                // "Content-Type":"multipart/form-data" 
                Authorization:localStorage.token,
            }
        });
        return {data:respons.data,success: true, message: "Request successful"};

    }catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                return { message: "Unauthorized access. Please log in again.",success: false };
            } else if (error.response.status === 403) {
                return { message: "Forbidden access. You do not have permission.",success: false };
            } else if (error.response.status === 500) {
                return { message: "Server error. Please try again later." ,success: false};
            } else {
                return { message: `Error: ${error.response.statusText}` ,success: false};
            }
        } else if (error.request) {
            return { message: "No response from server. Please try again.",success: false };
        } else {
            return { message: "An error occurred while making the request." ,success: false};
        }
    }


}
