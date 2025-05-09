import {toast} from "react-hot-toast";
export const errorToast = (msg:string)=>{
    return toast.error(msg,{
        duration:1500
    });
}

export const successToast = (msg:string)=>{
    return toast.success(msg,{
        duration:1500
    });
}
export function isValidEmail(email:string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  