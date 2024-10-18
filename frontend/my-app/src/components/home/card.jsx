import React from "react";
import axios from "axios";
import { FaRegTrashAlt, FaRegHeart, FaHeart } from "react-icons/fa";
import { TbDragDrop } from "react-icons/tb";

const Card = ({
  setInputDiv,
  setUpdatedData,
  setActiveCard,
  task,
  fetchGetTasks,
}) => {
  const headers = { id: localStorage.getItem("id") };

  const [isDragging, setIsDragging] = React.useState(false);

  const handleUpdate = async (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  const switchHighlightValue = async (id, highlighted) => {
    try {
      await axios.patch(
        `http://localhost:7000/tasks/${id}`,
        { highlighted: !highlighted },
        { headers }
      );
      fetchGetTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/tasks/${id}`, { headers });
    } catch (err) {
      console.log(err);
    }
    fetchGetTasks();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "On going":
        return "bg-blue-500";
      case "Pending":
        return "bg-yellow-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-red-500";
    }
  };

  const handleDragStart = () => {
    setActiveCard(task._id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setActiveCard(null);
    setIsDragging(false);
  };

  const handleDragButton = (e) => {
    handleDragStart();
  };

  return (
    <div
      className={`flex flex-col w-full justify-between rounded p-4 my-2 
        bg-gray-700 ${
          isDragging ? "opacity-0  shadow-lg transform scale-95" : ""
        }
      transition-all duration-300 ease-in-out`}
      draggable={isDragging}
      onDragEnd={handleDragEnd}
      key={task._id}
      onDoubleClick={() =>
        handleUpdate(task._id, task.title, task.desc, task.status)
      }
    >
      <div>
        <h3 className="text-xl font-semibold flex justify-between">
          {task.title}
          <button
            className="flex justify-around hover:bg-gray-600 p-2 rounded transition-all duration-400 cursor-"
            onMouseDown={handleDragButton}
          >
            <TbDragDrop />
          </button>
        </h3>
        <p className="text-gray-400 my-2">{task.desc}</p>
      </div>
      <div className="mt-4 w-full items-center flex">
        <button
          className={`${getStatusColor(task.status)} p-2 py-1 rounded w-3/6`}
        >
          {task.status}
        </button>
        <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
          <button
            className="w-1/2 flex justify-around hover:bg-gray-600 p-2 rounded transition-all duration-400 text-red-400"
            onClick={() => switchHighlightValue(task._id, task.highlighted)}
          >
            {task.highlighted ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button
            className="w-1/2 flex justify-around hover:bg-gray-600 p-2 rounded transition-all duration-400"
            onClick={() => deleteTask(task._id)}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
