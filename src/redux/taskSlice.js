import { createSlice } from "@reduxjs/toolkit";

const saveTaskInLocalStorage = (task) => {
  localStorage.setItem("tasks", JSON.stringify(task));
};

const getTask = () => {
  const tasks = localStorage.getItem("tasks");
  if (tasks) return JSON.parse(tasks);
  else return [];
};

const initialState = {
  taskList: getTask(),
  selectedTask: {},
  isTaskEditing: false,
  filterBy: "Today",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      state.taskList = [
        ...state.taskList,
        {
          title: payload.title,
          type: payload.type,
          dueDate: new Date(payload.dueDate).toLocaleDateString(),
          desc: payload.desc,
          id: crypto.randomUUID(),
          completed: false,
        },
      ];
      saveTaskInLocalStorage(state.taskList);
    },
    deleteTask: (state, { payload }) => {
      state.taskList = state.taskList.filter((task) => task.id !== payload.id);
      saveTaskInLocalStorage(state.taskList);
    },
    updateTask: (state, { payload }) => {
      state.taskList = state.taskList.map((task) => {
        if (task.id == payload.id) {
          if (payload.case == "updateStatus") {
            return { ...task, completed: !task.completed };
          }
          if (payload.case == "updateDetails") {
            return {
              ...task,
              title: payload.title,
              desc: payload.desc,
              type: payload.type,
              dueDate: payload.dueDate,
            };
          }
        }
        return task;
      });
      saveTaskInLocalStorage(state.taskList);
    },
    getSelectedTask: (state, { payload }) => {
      state.selectedTask = state.taskList.find((task) => task.id == payload.id);
    },
    setEditingTrue: (state) => {
      state.isTaskEditing = true;
    },
    setEditingFalse: (state) => {
      state.isTaskEditing = false;
    },
    setFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  getSelectedTask,
  setEditingTrue,
  setEditingFalse,
  setFilterBy,
} = taskSlice.actions;

export default taskSlice.reducer;
