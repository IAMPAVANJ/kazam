// import type { ICredetials, IToDo } from "../types/types";
import api from "./ApiLayer";

const useGetApi =()=>{
    
    const wakeup = ()=>{
        return api.get("/user/wakeup")
    }

    const getAllTodos = ()=>{
        return api.get("/user/todo")
    }

    return {
        wakeup,
        getAllTodos
        }
}

export default useGetApi;