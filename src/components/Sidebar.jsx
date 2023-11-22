import { useDispatch, useSelector } from "react-redux";
import {
  FaBars,
  FaSearch,
  FaTasks,
  FaPlus,
  FaDotCircle,
  FaSlidersH,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdKeyboardDoubleArrowRight, MdDelete } from "react-icons/md";
import { addList, setFilterBy, deleteList } from "../redux/taskSlice";
import { format } from "date-fns";
import { toast } from "react-toastify";
const asideFooter = ["Settings", "Sign out"];

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  tasks,
  activeTask,
  setActiveTask,
  isListAdding,
  setIsListAdding,
  listName,
  setListName,
  setIsModalOpen,
}) => {
  const dispatch = useDispatch();
  const { taskList, lists } = useSelector((store) => store.task);

  const handleListDeletion = (name) => {
    dispatch(deleteList(name));
    location.reload();
  };

  return (
    <aside
      className={`flex flex-col gap-4 h-[calc(100vh-32px)] z-10 transition-all duration-300 overflow-x-hidden overflow-y-auto  ${
        window.innerWidth > 900 && isSidebarOpen
          ? "max-w-xs flex-1 bg-white"
          : window.innerWidth > 900 && !isSidebarOpen
          ? "max-w-0 invisible"
          : window.innerWidth < 900 && isSidebarOpen
          ? "block absolute top-0 left-0 translate-x-0 h-screen w-full max-w-xs p-4 bg-gray-300"
          : "translate-x-[-100%] hidden"
      }`}
    >
      <div className="flex place-items-center place-content-between w-full">
        <p className="text-2xl font-extrabold">Menu</p>
        <FaBars
          onClick={() => setIsSidebarOpen(false)}
          className="text-3xl cursor-pointer text-gray-500"
        />
      </div>
      <div className="relative w-11/12 mx-auto">
        <FaSearch className="absolute top-[50%] translate-y-[-50%] left-2 text-gray-500" />
        <input
          className="border border-gray-300 outline-none w-full pl-8 py-1 rounded-lg"
          placeholder="Search"
          type="search"
          name=""
          id="search"
        />
      </div>
      <div className="w-full my-4 grid gap-2">
        <p>TASKS</p>
        {tasks.map((task) => (
          <div
            onClick={() => {
              if (window.innerWidth < 900) {
                setIsSidebarOpen(false);
              }
              setActiveTask(task);
              dispatch(setFilterBy(task));
              setIsModalOpen(false);
            }}
            className={`flex place-items-center justify-between text-xl py-1 px-2 rounded-lg cursor-pointer ${
              activeTask == task && "bg-gray-300"
            }`}
            key={task}
          >
            <button className={`flex gap-3 place-items-center`}>
              {task == "Today" ? (
                <FaTasks className="text-blue-600" />
              ) : (
                <MdKeyboardDoubleArrowRight className="text-blue-600" />
              )}
              {task}
            </button>
            <p className="text-base text-gray-500">
              {task == "Today"
                ? taskList.filter(
                    (task) => task.dueDate == format(new Date(), "yyyy-MM-dd")
                  ).length
                : task == "Upcoming"
                ? taskList.filter(
                    (task) => task.dueDate > format(new Date(), "yyyy-MM-dd")
                  ).length
                : taskList.length}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full grid gap-2 RobotoFont">
        <p>LISTS</p>
        {lists.map((list, index) => (
          <div className="grid gap-1" key={list}>
            <div
              onClick={() => {
                if (window.innerWidth < 900) {
                  setIsSidebarOpen(false);
                }
                setActiveTask(list);
                dispatch(setFilterBy(list));
                setIsModalOpen(false);
              }}
              className={`flex place-items-center justify-between text-xl py-1 px-2 rounded-lg cursor-pointer ${
                activeTask == list && "bg-gray-300"
              }`}
            >
              <button className="flex gap-3 place-items-center">
                <FaDotCircle className="text-sm text-purple-500" />
                {list}
              </button>
              <p className="text-base text-gray-500">
                {taskList.filter((task) => task.type == list).length}
              </p>
            </div>
            <button
              onClick={() => handleListDeletion(list)}
              className={`border border-gray-400 w-11/12 m-auto text-red-400 hover:text-red-600 ${
                activeTask == list ? "inline-block" : "hidden"
              }`}
              type="button"
            >
              Delete
            </button>
          </div>
        ))}
        {!isListAdding && (
          <button
            onClick={() => setIsListAdding(true)}
            className="flex items-center justify-center py-2 rounded-lg border border-gray-400 gap-2 leading-none onRenderAnimate"
          >
            <FaPlus className="text-gray-600" /> Add New List
          </button>
        )}
        {isListAdding && (
          <div className="flex flex-col gap-2 onRenderAnimate">
            <input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              className="border border-gray-400 py-1 pl-3"
              type="text"
              placeholder="Enter List Name.."
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  dispatch(addList({ listName }));
                  setIsListAdding(false);
                  setListName("");
                  toast.success("List added")
                }}
                className="bg-green-500 py-1 flex-1"
              >
                Add List
              </button>
              <button
                onClick={() => setIsListAdding(false)}
                className="bg-gray-400 py-1 flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="grid place-content-start gap-3 p-2 mt-auto text-gray-700">
        {asideFooter.map((item) => (
          <button className="flex place-items-center gap-2" key={item}>
            {item == "Settings" ? <FaSlidersH /> : <FaSignOutAlt />}
            {item}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
