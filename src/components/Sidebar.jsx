import { useDispatch } from "react-redux";
import {
  FaBars,
  FaSearch,
  FaTasks,
  FaPlus,
  FaDotCircle,
  FaSlidersH,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { setFilterBy } from "../redux/taskSlice";
const asideFooter = ["Settings", "Sign out"];

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  tasks,
  lists,
  activeTask,
  setActiveTask,
  isListAdding,
  setIsListAdding,
  addList,
  listName,
  setListName,
}) => {
  const dispatch = useDispatch();
  return (
    <aside
      className={`flex flex-col gap-4 h-[calc(100vh-32px)] bg-white z-10 transition-all duration-300 overflow-hidden flex-1 ${
        isSidebarOpen ? "max-w-xs" : "max-w-0 invisible"
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
                setActiveTask(task)
              dispatch(setFilterBy(task));
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
            <p className="text-base text-gray-500">5</p>
          </div>
        ))}
      </div>
      <div className="w-full grid gap-2">
        <p>LISTS</p>
        {lists.map((list) => (
          <div
            onClick={() => {
              setActiveTask(list);
              dispatch(setFilterBy(list));
            }}
            className={`flex place-items-center justify-between text-xl py-1 px-2 rounded-lg cursor-pointer ${
              activeTask == list && "bg-gray-300"
            }`}
            key={list}
          >
            <button className="flex gap-3 place-items-center">
              <FaDotCircle className="text-sm text-red-500" />
              {list}
            </button>
            <p className="text-base text-gray-500">3</p>
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
                  addList(listName);
                  setIsListAdding(false);
                  setListName("");
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
