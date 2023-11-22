import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import SingleTask from "./SingleTask";
import { setEditingFalse, setTaskAddingTrue } from "../redux/taskSlice";
import { format } from "date-fns";

const Main = ({ activeTask, setIsModalOpen, setIsSidebarOpen }) => {
  const { taskList, filterBy } = useSelector((store) => store.task);
  const [filterTask, setFilterTask] = useState(taskList);
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredTasks = taskList.filter((task) => {
      if (filterBy == "All Task") {
        return task;
      }
      if (filterBy == "Today") {
        return task.dueDate == format(new Date(), "yyyy-MM-dd");
      } else if (filterBy == "Upcoming") {
        return task.dueDate > format(new Date(), "yyyy-MM-dd");
      } else {
        return task.type == filterBy;
      }
    });
    setFilterTask(filteredTasks);
  }, [filterBy, taskList]);

  const emptyList = (
    <p className="p-4 text-center text-2xl text-red-500 onRenderAnimate">No tasks found</p>
  );

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 900) setIsSidebarOpen(false);
      }}
      className={`flex-1`}
    >
      <h2 className="text-3xl font-extrabold ml-10 flex items-center">
        {activeTask}
        <span className="ml-8 text-2xl">
          {activeTask == "All Task"
            ? taskList.length
            : activeTask == "Today"
            ? taskList.filter(
                (task) => task.dueDate == format(new Date(), "yyyy-MM-dd")
              ).length
            : activeTask == "Upcoming"
            ? taskList.filter(
                (task) => task.dueDate > format(new Date(), "yyyy-MM-dd")
              ).length
            : taskList.filter((task) => task.type == filterBy).length}
        </span>
      </h2>
      <section className="px-10 py-8 max-[500px]:px-5">
        <button
          onClick={() => {
            dispatch(setTaskAddingTrue());
            dispatch(setEditingFalse());
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 text-xl text-gray-500"
          type="button"
        >
          <FaPlus />
          Add New Task
        </button>
      </section>
      <section className={`grid gridColumns gap-4 px-6 max-[500px]:px-0`}>
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
