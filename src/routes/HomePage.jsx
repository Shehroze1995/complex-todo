import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Modal from "../components/Modal";
import { format } from "date-fns";
import { useSelector } from "react-redux";
const tasks = [ "All Task", "Today", "Upcoming"];

const HomePage = () => {
  const { lists } = useSelector((store) => store.task);
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    window.innerWidth < 900 ? false : true
  );
  const [activeTask, setActiveTask] = useState(tasks[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [type, setType] = useState(lists[0]);
  const [isListAdding, setIsListAdding] = useState(false);
  const [listName, setListName] = useState("");

  return (
    <div
      className={`p-4 relative overflow-hidden min-h-screen flex RobotoFont`}
    >
      <FaBars
        onClick={() => setIsSidebarOpen(true)}
        className={`text-3xl text-gray-500 cursor-pointer absolute top-[18px] left-4`}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        tasks={tasks}
        lists={lists}
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        isListAdding={isListAdding}
        setIsListAdding={setIsListAdding}
        listName={listName}
        setListName={setListName}
        setType={setType}
        setIsModalOpen={setIsModalOpen}
      />
      <Main
        setIsModalOpen={setIsModalOpen}
        activeTask={activeTask}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        lists={lists}
        setTitle={setTitle}
        title={title}
        setDesc={setDesc}
        desc={desc}
        setDueDate={setDueDate}
        dueDate={dueDate}
        setType={setType}
        type={type}
      />
    </div>
  );
};

export default HomePage;
