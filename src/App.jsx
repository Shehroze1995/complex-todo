import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from "./routes/GetStarted";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="complex-todo" element={<GetStarted />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
