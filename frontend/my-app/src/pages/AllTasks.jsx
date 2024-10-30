import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import InputData from "../components/home/InputData";
import axios from "axios";
import StatusRowsContainer from "../components/home/statusRowsContainer";
import Highlight from "../components/home/highlight";
import SearchBar from "../components/home/searchBar";
import { AuthContext } from "../context/authContext";

const baseURL = "http://localhost:7000/tasks";
const headers = { id: localStorage.getItem("id") };

const AllTasks = (status) => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [userInfo, setUserInfo] = useState(null);
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
    status: "",
  });
  const [activeCard, setActiveCard] = useState(null);
  const [tasks, setTasks] = useState(null);
  const { userID } = useContext(AuthContext);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/users/${userID}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    if (userID) {
      fetchUserInfo();
    }
  }, [userID]);
  const onDrop = async (status) => {
    try {
      await axios.patch(
        `http://localhost:7000/tasks/${activeCard}`,
        { status },
        { headers }
      );
      fetchGetTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const fetchGetTasks = async () => {
    const response = await axios.get(baseURL, { headers });
    const newTasks = response.data;
    setTasks(newTasks);
  };

  useEffect(() => {
    fetchGetTasks();
  }, []);

  if (!tasks) return "no data";

  return (
    <>
      <div className="w-full transition-all duration-400">
        <div className="w-full flex justify-between px-6 p-4 bg-gray-700 rounded-xl items-center">
          <SearchBar setTasks={setTasks} fetchGetTasks={fetchGetTasks} />
          <div className="flex w-fit h-full px-4 py-2">
            {userInfo ? (
              <div>
                <p>Welcome to you workspace, {userInfo.fullName}</p>
              </div>
            ) : (
              <p>Loading user information...</p>
            )}
          </div>
        </div>
        <div className="m-3">
          <Highlight
            setInputDiv={setInputDiv}
            setUpdatedData={setUpdatedData}
            setActiveCard={setActiveCard}
            fetchGetTasks={fetchGetTasks}
            tasks={tasks}
          />
        </div>
        <StatusRowsContainer
          InputDiv={InputDiv}
          setInputDiv={setInputDiv}
          UpdatedData={UpdatedData}
          setUpdatedData={setUpdatedData}
          setActiveCard={setActiveCard}
          onDrop={onDrop}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          fetchGetTasks={fetchGetTasks}
        />
      </div>
      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        UpdatedData={UpdatedData}
        setUpdatedData={setUpdatedData}
        fetchGetTasks={fetchGetTasks}
      />
      <div
        className="fixed flex items-center justify-around bottom-4 right-4 h-16 w-16 p-4 bg-gray-700 rounded-xl hover:bg-gray-500 cursor-pointer transition-all duration-400"
        onClick={() => setInputDiv("fixed")}
      >
        <FaPlus className="text-3xl" />
      </div>
    </>
  );
};

export default AllTasks;
