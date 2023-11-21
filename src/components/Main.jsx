import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import SingleTask from "./SingleTask";

const Main = ({ activeTask, setIsModalOpen }) => {
  const { taskList, filterBy } = useSelector((store) => store.task);
  const [filterTask, setFilterTask] = useState(taskList);

  useEffect(() => {
    const filteredTasks = taskList.filter((task) => {
      if (filterBy == "Today") {
        return task.dueDate == new Date().toLocaleDateString();
      } else if (filterBy == "Upcoming") {
        return task.dueDate > new Date().toLocaleDateString();
      } else {
        return task.type == filterBy;
      }
    });
    setFilterTask(filteredTasks);
  }, [filterBy, taskList]);

  const emptyList = (
    <p className="p-4 text-center text-2xl text-red-500">No tasks found</p>
  );

  return (
    <div className=" flex-1">
      <h2 className="text-3xl font-extrabold ml-10">{activeTask}</h2>
      <section className="px-10 py-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-xl text-gray-500"
          type="button"
        >
          <FaPlus />
          Add New Task
        </button>
      </section>
      <section>
        {filterTask.length == 0
          ? emptyList
          : filterTask.map((task) => {
              return (
                <SingleTask
                  setIsModalOpen={setIsModalOpen}
                  key={task.id}
                  {...task}
                />
              );
            })}
      </section>
    </div>
  );
};

export default Main;
