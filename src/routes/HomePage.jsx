import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Modal from "../components/Modal";
const tasks = ["Today", "Upcoming"];
let lists = ["Personal", "Work"];

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTask, setActiveTask] = useState(tasks[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [type, setType] = useState(lists[0]);
  const [isListAdding, setIsListAdding] = useState(false);
  const [listName, setListName] = useState("");

  const addList = (name) => {
    lists = [...lists, name];
  };

  return (
    <div className="p-4 relative overflow-hidden flex">
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
        addList={addList}
        listName={listName}
        setListName={setListName}
      />
      <Main setIsModalOpen={setIsModalOpen} activeTask={activeTask} />
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
