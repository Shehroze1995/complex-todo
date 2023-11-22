import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  setEditingFalse,
  setTaskAddingFalse,
  updateTask,
} from "../redux/taskSlice";
import { IoClose } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { toast } from "react-toastify";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  title,
  setTitle,
  desc,
  setDesc,
  dueDate,
  setDueDate,
  type,
  setType,
}) => {
  const dispatch = useDispatch();
  const { selectedTask, isTaskEditing, lists, isTaskAdding } = useSelector(
    (store) => store.task
  );
  const [selectedTodo, setSelectedTodo] = useState(selectedTask);

  useEffect(() => {
    setSelectedTodo(selectedTask);
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTaskEditing) {
      dispatch(
        updateTask({
          id: selectedTask.id,
          title,
          desc,
          dueDate,
          type,
        })
      );
      toast.success("Task updated")
    } else {
      dispatch(addTask({ title, desc, type, dueDate }));
      toast.success("Task added")
    }
    setIsModalOpen(false);
    setTitle("");
    setDesc("");
    setDueDate(format(new Date(), "yyyy-MM-dd"));
    setType(lists[0]);
  };

  useEffect(() => {
    setTitle(selectedTask.title || "");
    setDesc(selectedTask.desc || "");
    setDueDate(selectedTask.dueDate || format(new Date(), "yyyy-MM-dd"));
    setType(selectedTask.type || lists[0]);
  }, [selectedTodo]);

  useEffect(() => {
    setTitle("");
    setDesc("");
    setDueDate("");
    setType(lists[0]);
  }, [isTaskAdding]);

  return (
    <div
      className={`transition-all duration-300 ${
        isModalOpen ? "translate-x-0" : "absolute top-0 right-0 translate-x-[100%] invisible"
      } ${
        window.innerWidth > 1200
          ? "block flex-1 max-w-md "
          : "fixed top-0 left-0 z-10 w-screen h-screen bg-[#0000003d] flex items-center justify-center "
      }`}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={`bg-white w-11/12 max-w-md p-4 flex flex-col gap-4 text-xl rounded-lg transition-all duration-300 ${
          isModalOpen ? "" : ""
        } max-[370px]:text-base`}
      >
        <h3 className="text-3xl">{isTaskEditing ? "Update" : "Add"} Task:</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 w-full py-1 pl-3 outline-none rounded-lg"
          placeholder="Add Title.."
          type="text"
          required
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border border-gray-300 w-full py-1 pl-3 outline-none rounded-lg"
          placeholder="Description.."
          name="description"
          id="description"
          cols="10"
          rows="5"
          required
        ></textarea>
        <div className="flex items-center justify-between">
          <label htmlFor="list">List</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="outline-none border border-gray-300 py-1 px-4 rounded-lg"
            name="list"
            id="list"
          >
            {lists.map((list) => (
              <option key={list} value={list}>
                {list}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="dueDate">Due Date</label>
          <input
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={format(new Date(), "yyyy-MM-dd")}
            className="outline-none border border-gray-300 p-1 rounded-lg"
            type="date"
            name="dueDate"
            id="dueDate"
            required
          />
          {/* <DatePicker
            className="outline-none w-28 ml-4"
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            minDate={new Date()} required
          /> */}
        </div>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 flex-1 py-2 text-white rounded transition-all duration-300 hover:bg-blue-600"
            type="submit"
          >
            {isTaskEditing ? "Update" : "Add"}
          </button>
          <button
            onClick={() => {
              setIsModalOpen(false);
              setTitle("");
              setDesc("");
              setDueDate("");
              setType(lists[0]);
              dispatch(setTaskAddingFalse());
              const timeout = setTimeout(() => {
                dispatch(setEditingFalse());
              }, 300);
              return () => clearTimeout(timeout);
            }}
            className="bg-gray-300 flex-1 py-2 rounded transition-all duration-300 hover:bg-gray-400"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    // <div className="flex-1 max-w-sm">
    //   <form className="text-xl grid gap-4 text-gray-600">
    //     <div className="flex items-center justify-between">
    //       <h3 className="text-2xl text-black">Task:</h3>
    //       <IoClose className="cursor-pointer text-gray-500 text-3xl" />
    //     </div>
    //     <input
    //       className="border border-gray-300 rounded-lg w-full py-1 pl-5 outline-none"
    //       placeholder="Title.."
    //       type="text"
    //     />
    //     <textarea
    //       className="border border-gray-300 w-full rounded-lg py-1 px-5 outline-none"
    //       placeholder="Description.."
    //       id=""
    //       rows="5"
    //     ></textarea>
    //     <div className="flex items-center gap-16">
    //       <label htmlFor="list">List</label>
    //       <select
    //         className="outline-none p-1"
    //         name="list"
    //         id="list"
    //       >
    //         {list.map((list) => (
    //           <option key={list} value={list}>
    //             {list}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //     <div className="">
    //       <label htmlFor="">Due Date</label>
    //       <DatePicker
    //         className="outline-none w-28 ml-4"
    //         selected={dueDate}
    //         onChange={(date) => setDueDate(date)}
    //         minDate={new Date()}
    //       />
    //     </div>
    //   </form>
    // </div>
  );
};

export default Modal;
