import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  getSelectedTask,
  updateTask,
  setEditingTrue,
  setTaskAddingFalse,
} from "../redux/taskSlice";
import { MdEdit, MdDelete, MdDateRange } from "react-icons/md";
import { format } from "date-fns";
import { toast } from "react-toastify";

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

  const handleDelete = (id) => {
    setIsModalOpen(false);
    dispatch(deleteTask({ id }));
    toast.info('Task deleted')
  };
  const handleStatus = (id, completed) => {
    dispatch(updateTask({ id, completed: !completed }));
  };
  const handleEdit = (id) => {
    dispatch(setTaskAddingFalse());
    dispatch(getSelectedTask({ id }));
    dispatch(setEditingTrue());
    setIsModalOpen(true);
  };

  return (
    <div
      className="rounded-md p-2 flex justify-between w-full max-[370px]:text-sm"
      key={id}
    >
      <section>
        <p
          className={`capitalize text-2xl underline break-all ${
            completed && "line-through"
          } max-[370px]:text-xl`}
        >
          {title}
        </p>
        <p className={`break-all ${completed && "line-through"}`}>
          Description: {desc}
        </p>
        <p className="text-gray-600 flex items-center gap-1">
          <MdDateRange className="text-xl -mt-1"/> {format(new Date(dueDate), "dd-MM-yyyy")}
        </p>
        <div className="flex items-center gap-1 text-green-600 select-none">
          <input
            checked={completed}
            onChange={() => handleStatus(id, completed)}
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
