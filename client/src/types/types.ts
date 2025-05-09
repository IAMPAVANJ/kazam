export interface ICredetials {
    email:string,
    password:string
}
export interface IToDo {
    _id?:string,
    title?:string,
    description?:string,
    dueDate?:Date | string,
    status:'pending' | 'completed',
}