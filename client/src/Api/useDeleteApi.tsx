// import type { ICredetials, IToDo } from "../types/types";
import api from "./ApiLayer";

const useDeleteApi =()=>{
    
    const DeleteTodo = (id:string)=>{
        return api.delete(`/user/todo/${id}`)
    }


    return {
        DeleteTodo
        }
}

export default useDeleteApi;