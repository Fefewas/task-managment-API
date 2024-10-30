import { React } from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex bg-gray-900 text-white min-h-[95vh] h-fit p-6 w-full">
      <Outlet />
    </div>
  );
};

export default Home;
