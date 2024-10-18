import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({
  InputDiv,
  setInputDiv,
  UpdatedData,
  setUpdatedData,
  fetchGetTasks,
}) => {
  const [Data, setData] = useState({ title: "", desc: "", status: "" });
  const headers = { id: localStorage.getItem("id") };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  useEffect(() => {
    setData({ title: UpdatedData.title, desc: UpdatedData.desc });
  }, [UpdatedData]);

  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.post("http://localhost:7000/tasks", Data, headers);
    }
    setInputDiv("hidden");
    fetchGetTasks()
    setData({
      title: "",
      desc: "",
      status: "",
    });
  };

  const updateTask = async (id) => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required");
    } else {
      await axios.patch(
        `http://localhost:7000/tasks/${UpdatedData.id}`,
        Data,
        headers
      );
    }
    setData({
      title: "",
      desc: "",
      status: "",
    });
    setUpdatedData({
      id: "",
      title: "",
      desc: "",
      status: "",
    });
    setInputDiv("hidden");
    fetchGetTasks()
  };

  return (
    <>
      <div
        className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full text-3xl `}
      >
        <div className="w-3/6 bg-gray-900 min-h-fit h- rounded p-4">
          <div className="flex justify-end">
            <button
              className=" text-4xl items-center pb-2"
              onClick={() => {
                setInputDiv("hidden");
                setData({
                  title: "",
                  desc: "",
                  status: "",
                });
                setUpdatedData({
                  id: "",
                  title: "",
                  desc: "",
                  status: "",
                });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <input
            id="title"
            type="text"
            placeholder="Title"
            name="title"
            className="p-3 py-2 rounded rounded bg-gray-700 w-full"
            value={Data.title}
            onChange={changeHandler}
          />
          <textarea
            name="desc"
            placeholder="Enter your description"
            id="desc"
            cols="30"
            rows="10"
            className="p-3 py-2 rounded bg-gray-700 my-2 w-full text-xl text-gray-300"
            value={Data.desc}
            onChange={changeHandler}
          ></textarea>
          <form className="max-w-sm mx-auto">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Select an option:
            </label>
            <select
              value={Data.status}
              name="status"
              onChange={changeHandler}
              id="status"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Choose a status</option>
              <option value="Pending">Pending</option>
              <option value="On going">On going</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </form>
          <br />
          {UpdatedData.id === "" ? (
            <button
              className="bg-green-400 w-full py-3 items-center text-x"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <>
              <button
                className="bg-green-400 w-full py-3 items-center text-x"
                onClick={updateTask}
              >
                Update
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
