import { useDispatch } from "react-redux";
import {
  deleteTask,
  getSelectedTask,
  updateTask,
  setEditingTrue,
} from "../redux/taskSlice";
import { MdEdit, MdDelete } from "react-icons/md";

const SingleTask = ({
  id,
  title,
  desc,
  dueDate,
  type,
  completed,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => dispatch(deleteTask({ id }));
  const handleStatus = (id) => {
    dispatch(updateTask({ id, case: "updateStatus" }));
  };
  const handleEdit = (id) => {
    dispatch(getSelectedTask({ id }));
    dispatch(setEditingTrue());
    setIsModalOpen(true);
  };

  return (
    <div
      className="border-4 border-gray-300 rounded-md p-2 my-3 flex justify-between w-full max-w-lg ml-10"
      key={id}
    >
      <section>
        <p
          className={`capitalize text-2xl text-blue-500 underline ${
            completed && "line-through"
          }`}
        >
          {title}
        </p>
        <p className={`break-all ${completed && "line-through"}`}>
          Description: {desc}
        </p>
        <p className="text-gray-600">Due Date: {dueDate}</p>
        <p className="text-gray-600">Task nature: {type}</p>
        <div className="flex items-center gap-1 text-green-600 select-none">
          <input
            checked={completed}
            onChange={() => handleStatus(id)}
            className="w-4 h-4"
            type="checkbox"
            name="completed"
            id={id}
          />
          <label className="cursor-pointer" htmlFor={id}>
            Completed
          </label>
        </div>
      </section>
      <div className="flex gap-2">
        <MdEdit
          onClick={() => handleEdit(id)}
          className="w-9 h-9 p-1 bg-white rounded-full text-blue-500 cursor-pointer"
        />
        <MdDelete
          onClick={() => handleDelete(id)}
          className="w-9 h-9 p-1 bg-white rounded-full text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SingleTask;
