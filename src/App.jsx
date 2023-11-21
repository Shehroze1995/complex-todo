import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from "./routes/GetStarted";
import HomePage from "./routes/HomePage";
import Error from "./routes/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="complex-todo" element={<GetStarted />} />
        <Route path="complex-todo/homepage" element={<HomePage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
