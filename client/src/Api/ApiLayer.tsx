import axios from "axios";

const api = axios.create({
    baseURL: "https://kazam-ryfv.onrender.com",
    withCredentials: true,
})

api.interceptors.request.use((config)=>{
    const token = JSON.parse(localStorage.getItem("token")!);
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use(
    res=>res,
    async(err)=>{
        console.log(err,"error from interceptor",err);
        const originalRequest = err.config;
        console.log(originalRequest,"original request");
        originalRequest._retry = true;
        if((err.response.status === 401 || err.response.status === 403) && originalRequest.headers.Authorization!==undefined){
            // if the token is expired or invalid, try to refresh it
            
            try{
                const response = await api.post("/auth/refresh-token",{},{withCredentials:true});
                const newToken = response.data.accessToken;
                localStorage.setItem("token", newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            }catch(err){
                console.log(err);
                localStorage.removeItem("token");
                window.location.href = "/";

            }
        }

        return Promise.reject(err);
    }
);

export default api;