import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

const saveTaskInLocalStorage = (task) => {
  localStorage.setItem("tasks", JSON.stringify(task));
};

const getTask = () => {
  const tasks = localStorage.getItem("tasks");
  if (tasks) return JSON.parse(tasks);
  else
    return [
      {
        id: crypto.randomUUID(),
        title: "Code",
        desc: "Do some coding",
        type: "Work",
        dueDate: format(new Date(), "yyyy-MM-dd"),
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Projects",
        desc: "Create Projects",
        type: "Work",
        dueDate: format(new Date(), "yyyy-MM-dd"),
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Test",
        desc: "Prepare college test",
        type: "Personal",
        dueDate: format(new Date(), "yyyy-MM-dd"),
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Grocery",
        desc: "Get some groceries from market",
        type: "Personal",
        dueDate: format(new Date(), "yyyy-MM-dd"),
        completed: false,
      },
    ];
};

const getLists = () => {
  const lists = localStorage.getItem("lists");
  if (lists) return JSON.parse(lists);
  else return ["Personal", "Work"];
};

const initialState = {
  taskList: getTask(),
  selectedTask: {},
  isTaskAdding: false,
  isTaskEditing: false,
  filterBy: "All Task",
  lists: getLists(),
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
          dueDate: payload.dueDate,
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
          return { ...task, ...payload };
        }
        return task;
      });
      saveTaskInLocalStorage(state.taskList);
    },
    setTaskAddingTrue: (state) => {
      state.isTaskAdding = true;
      state.selectedTask = {};
    },
    setTaskAddingFalse: (state) => {
      state.isTaskAdding = false;
    },
    getSelectedTask: (state, { payload }) => {
      state.selectedTask = state.taskList.find((task) => task.id == payload.id);
    },
    setEditingTrue: (state) => {
      state.isTaskEditing = true;
    },
    setEditingFalse: (state) => {
      state.isTaskEditing = false;
      state.selectedTask = {};
    },
    setFilterBy: (state, action) => {
      state.filterBy = action.payload;
    },
    addList: (state, { payload }) => {
      if (state.lists.some((list) => list == payload.listName)) return;
      else state.lists = [...state.lists, payload.listName];
      localStorage.setItem("lists", JSON.stringify(state.lists));
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter((list) => list !== action.payload);
      localStorage.setItem("lists", JSON.stringify(state.lists));
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
  setTaskAddingTrue,
  setTaskAddingFalse,
  addList,
  deleteList,
} = taskSlice.actions;

export default taskSlice.reducer;
