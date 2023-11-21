import { useDispatch, useSelector } from "react-redux";
import { addTask, setEditingFalse, updateTask } from "../redux/taskSlice";
import { useEffect } from "react";

const Modal = ({
  lists,
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
  const { selectedTask, isTaskEditing } = useSelector((store) => store.task);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTaskEditing) {
      dispatch(
        updateTask({
          case: "updateDetails",
          id: selectedTask.id,
          title,
          desc,
          dueDate,
          type,
        })
      );
    } else {
      dispatch(addTask({ title, desc, type, dueDate }));
    }
    setIsModalOpen(false);
    setTitle("");
    setDesc("");
    setDueDate("");
    setType(lists[0]);
  };

  useEffect(() => {
    if (isTaskEditing) {
      setTitle(selectedTask.title);
      setDesc(selectedTask.desc);
      setDueDate(selectedTask.dueDate);
      setType(selectedTask.type);
    }
  }, [isTaskEditing]);

  return (
    <div
      className={`fixed top-0 left-0 z-10 w-full h-screen bg-[#00000091] flex items-center justify-center transition-all duration-300 ${
        isModalOpen ? "opacity-100" : "opacity-0 invisible"
      }`}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={`bg-white w-11/12 max-w-md p-4 flex flex-col gap-4 text-xl rounded-lg transition-all duration-300 ${
          isModalOpen ? "scale-100" : "scale-90"
        }`}
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
            className="outline-none border border-gray-300 p-1 rounded-lg"
            type="date"
            name="dueDate"
            id="dueDate"
            required
          />
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
  );
};

export default Modal;
