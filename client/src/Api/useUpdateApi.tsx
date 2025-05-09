import type { IToDo } from "../types/types";
import api from "./ApiLayer";


const useUpdateApi = ()=>{

    const updateUser = (id:string | undefined,data:IToDo)=>{
        return api.put(`/user/todo/${id}`,data)
    }

    return(
        updateUser
    )

} 

export default useUpdateApi;