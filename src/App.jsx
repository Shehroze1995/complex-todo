import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from "./routes/GetStarted";
import HomePage from "./routes/HomePage";
import Error from "./routes/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="complex-todo" element={<GetStarted />} />
        <Route path="complex-todo/homepage" element={<HomePage />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer autoClose={3000} theme="dark" />
    </BrowserRouter>
  );
};

export default App;
