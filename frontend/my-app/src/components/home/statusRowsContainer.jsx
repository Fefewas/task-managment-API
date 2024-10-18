import React from "react";
import Card from "./card";
import DropArea from "./dropArea";

const StatusRowsContainer = ({
  setInputDiv,
  setUpdatedData,
  setActiveCard,
  onDrop,
  tasks,
  fetchGetTasks,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "On going":
        return "bg-blue-400";
      case "Pending":
        return "bg-yellow-400";
      case "Completed":
        return "bg-green-400";
      default:
        return "bg-red-400";
    }
  };

  if (!tasks) return "No data";

  const rows = [
    {
      title: "Pending tasks",
      status: "Pending",
    },
    {
      title: "On going tasks",
      status: "On going",
    },
    {
      title: "Completed tasks",
      status: "Completed",
    },
    {
      title: "Cancelled tasks",
      status: "Cancelled",
    },
  ];

  return (
    <div className="">
      <div>
        <hr />
        <br />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {rows.map((row, i) => (
          <div key={"sidebar" + i} className="flex flex-col relative">
            <div
              className={`${getStatusColor(
                row.status
              )} flex flex-col w-full justify-between p-4 text-3xl text-center`}
            >
              {row.title}
            </div>
            <div className="p-6 relative">
              <DropArea onDrop={() => onDrop(row.status)} />
              {tasks
                .filter((task) => task.status === row.status)
                .map((task) => {
                  return (
                    <div key={"card-" + task._id} className="relative">
                      <Card
                        setInputDiv={setInputDiv}
                        setUpdatedData={setUpdatedData}
                        setActiveCard={setActiveCard}
                        task={task}
                        fetchGetTasks={fetchGetTasks}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusRowsContainer;
