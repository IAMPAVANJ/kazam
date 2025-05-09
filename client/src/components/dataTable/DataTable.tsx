import dayjs from "dayjs";
import type { IToDo } from "../../types/types";
import Icons from "../../utils/icons";
import useDeleteApi from "../../Api/useDeleteApi";

const DataTable = ({
  data = [],
  setData,
  setIsEdit,
  setSelectedTodo,
}: {
  data: IToDo[];
  setData: (data: IToDo[] | ((prevData: IToDo[]) => IToDo[])) => void;
  setIsEdit: (arg0: boolean) => void;
  setSelectedTodo: (arg0: IToDo) => void;
}) => {
  const { WhiteEye, DeleteIcon, EditIcon } = Icons;
  const { DeleteTodo } = useDeleteApi();

  const handleDelete = async (id: string | undefined) => {
    if (id) {
      try {
        await DeleteTodo(id);
        // Optionally, you can update the state to remove the deleted item from the UI
        setData((prevData) => prevData.filter((item) => item._id !== id));
        console.log("Todo deleted successfully");
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };

  return (
    <div className="w-full md:w-auto overflow-x-auto bg-[#27346A]/50 p-2 rounded-2xl">
      <div className="min-w-[600px] inline-block align-middle">
        {data.length > 0 && (
          <table className="w-full divide-y-2 divide-gray-700">
            <thead className="text-left">
              <tr className="*:font-medium *:text-gray-900">
                <th className="px-3 py-2 whitespace-nowrap text-xl font-semibold">
                  Sr
                </th>
                <th className="px-3 py-2 whitespace-nowrap text-xl font-semibold">
                  Title
                </th>
                <th className="px-3 py-2 whitespace-nowrap text-xl font-semibold">
                  Due Date
                </th>
                <th className="px-3 py-2 whitespace-nowrap text-xl font-semibold">
                  Status
                </th>
                <th className="px-3 py-2 whitespace-nowrap text-xl font-semibold">
                  View
                </th>
                <th className="px-3 py-2 whitespace-nowrap text-xl font-semibold">
                  Edit
                </th>
                <th className="px-3 py-2 whitespace-nowrap text-xl font-semibold">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item: IToDo, index) => {
                return (
                  <tr className="*:text-gray-900 *:first:font-medium">
                    <td className="px-3 py-2 whitespace-nowrap">{index + 1}</td>
                    <td className="px-3 py-2 max-w-[60%]">{item?.title}</td>
                    <td className="px-3 py-2 max-w-[60%]">
                      {dayjs(item?.dueDate).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-3 py-2 max-w-[60%]">{item?.status}</td>
                    <td className="px-3 py-2">
                      <img src={WhiteEye} className="cursor-pointer size-6" />
                    </td>
                    <td className="px-3 py-2">
                      <img
                        onClick={() => {
                          setIsEdit(true);
                          setSelectedTodo(item);
                        }}
                        src={EditIcon}
                        className="cursor-pointer size-6"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <img
                        onClick={() => {
                          handleDelete(item?._id);
                        }}
                        src={DeleteIcon}
                        className="cursor-pointer size-6"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DataTable;
