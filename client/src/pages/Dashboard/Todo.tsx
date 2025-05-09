import { useEffect, useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Navbar from "../../components/navbar/Navbar";
import useGetApi from "../../Api/useGetApi";
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import usePostApi from "../../Api/usePostApi";
import type { IToDo } from "../../types/types";
import CreateForm from "../../components/popups/CreateFormPopup";
import { successToast } from "../../utils/common";
import useUpdateApi from "../../Api/useUpdateApi";

const Todo = () => {
  const [data, setData] = useState<IToDo[]>([]);
  const { getAllTodos } = useGetApi();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<IToDo | null>(null);
  const { createTodo } = usePostApi();
  const updateUser = useUpdateApi();
  const [form, setForm] = useState<IToDo>({
    title: "",
    description: "",
    dueDate: new Date(),
    status: "pending",
  });
  const createNewTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await updateUser(form._id, {
        title: form.title,
        description: form.description,
        dueDate: form.dueDate,
        status: form.status,
      })
        .then((res) => {
          console.log(res);
          setIsEdit(false);
          setIsOpen(false);
          setData((prevData) =>
            prevData.map((item) => (item._id === form._id ? res.data : item))
          );
          successToast("Todo Updated Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await createTodo(form)
        .then((res) => {
          console.log(res);
          setIsOpen(false);
          setData((prevData) => [...prevData, res.data]);
          successToast("Todo Created Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(()=>{
    if(isEdit){
      setIsOpen(true);
      setForm(selectedTodo!);
    }
  },[isEdit])

  useEffect(() => {
    setLoading(true);
    try {
      const response = getAllTodos();
      response
        .then((res) => {
          setData(res.data);
          console.log(res);
            setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar setIsOpen={setIsOpen} />
      <div className="flex flex-col items-center justify-start h-screen w-full mx-auto">
        <header className="flex flex-col items-center justify-start w-auto h-auto mb-1">
          <h1 className="text-4xl font-bold mb-4 text-indigo-600">Todo List</h1>
          <div className="flex flex-col items-center justify-center h-auto">
            <h2 className="text-2xl font-bold text-pretty text-gray-700 sm:text-lg/relaxed">
              Welcome to your Todo List
            </h2>
            <p className="text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Here you can manage your tasks efficiently.
            </p>
            <p className="text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Add, edit, and delete tasks as needed.
            </p>
            <p className="text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Stay organized and productive!
            </p>
          </div>
        </header>

        {loading ? (
          <SkeletonLoader />
        ) : data.length > 0 ? (
          <DataTable
          data={data} 
          setData={setData}
          setIsEdit={setIsEdit}
          setSelectedTodo={setSelectedTodo}
          isEdit={isEdit}
          />
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            type="button"
            className="relative hidden sm:ml-6 sm:block rounded-sm p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden border border-indigo-600 bg-indigo-600 px-3 py-1 font-medium  shadow-sm transition-colors hover:bg-indigo-700"
          >
            <span className="text-white">+ New </span>
          </button>
        )}
        <CreateForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          formData={form}
          setFormData={setForm}
          createTodo={createNewTodo}
          isEdit={isEdit}
          selectedTodo={selectedTodo}
          setIsEdit={setIsEdit}
        />
      </div>
    </div>
  );
};

export default Todo;
