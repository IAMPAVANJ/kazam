/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import type { IToDo } from "../../types/types";
import { useEffect } from "react";

export default function CreateForm({
  isOpen,
  setIsOpen,
  formData,
  setFormData,
  createTodo,
  isEdit,
  selectedTodo,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  formData: IToDo;
  setFormData: (formData: any) => void;
  createTodo:(e:React.FormEvent)=>void;
  isEdit:boolean;
  selectedTodo:IToDo | null;
}) {
  
  useEffect(()=>{
    if(isEdit && selectedTodo){
      setFormData(selectedTodo);
    }
  },[])
  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-2xl">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl dark:bg-gray-700 bg-gray-700/25 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                { isEdit ? "Update Todo" : "Create Todo"}
              </DialogTitle>
              <hr />
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        id="title"
                        value={formData.title}
                        onChange={(e) => {
                          setFormData((prev: any) => ({
                            ...prev,
                            title: e.target.value,
                          }));
                        }}
                        name="title"
                        type="text"
                        required
                        autoComplete="name"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        rows={3}
                        id="description"
                        value={formData.description}
                        onChange={(e) => {
                          setFormData((prev: any) => ({
                            ...prev,
                            description: e.target.value,
                          }));
                        }}
                        name="description"
                        required
                        autoComplete="description"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Due Date
                    </label>
                    <div className="mt-2">
                      <input
                        id="date"
                        type="date"
                        value={formData?.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          setFormData((prev: any) => ({
                            ...prev,
                            dueDate: e.target.value,
                          }));
                        }}
                        name="description"
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
                  
                  {isEdit && <div>
                    <label
                      htmlFor="date"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Status
                    </label>
                    <div className="mt-2">
                      <select onChange={(e) => setFormData((prev: any) => ({
                        ...prev,
                        status: e.target.value,
                      }))} value={formData.status} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>}

                  <div>
                    <button
                      onClick={createTodo}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
              
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
