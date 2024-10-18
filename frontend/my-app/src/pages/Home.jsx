import { React } from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex min-h-[95vh] h-fit w-full">
      <Outlet />
    </div>
  );
};

export default Home;
