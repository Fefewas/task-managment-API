import { React } from "react";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="flex bg-gray-900 text-white min-h-[95vh] h-fit p-6 w-full">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<AllTasks />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
