
import type { ICredetials, IToDo } from "../types/types";
import api from "./ApiLayer";

const usePostApi =()=>{
   

    const login = (body:ICredetials)=>{
        return api.post("/user/login",body)
    }
    const register = (body:ICredetials)=>{
        return api.post("/user/signup",body)
    }
    const createTodo = (body:IToDo)=>{
        return api.post("/user/todo/create",body)
    }
    const Logout = ()=>{
        return api.post("/user/logout")
    }

    return {
        login,
        register,
        createTodo,
        Logout
        }
}

export default usePostApi;