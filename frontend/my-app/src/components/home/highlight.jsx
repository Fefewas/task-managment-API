import React from "react";
import Card from "./card";

const Highlight = ({
  setInputDiv,
  setUpdatedData,
  setActiveCard,
  tasks = [],
  fetchGetTasks,
}) => {
  if (!tasks || tasks.length === 0) {
    return null;
  }

  const highlightedTasks = tasks.filter((task) => task.highlighted === true);

  if (highlightedTasks.length === 0) {
    return null;
  }

  return (
    <>
      <div className="rounded-xl bg-gray-600 p-4 text-4xl">
        <h1>Highlights</h1>
      </div>
      <div
        className="flex overflow-x-auto snap-x snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {highlightedTasks.map((task) => (
          <div
            key={"card-" + task._id}
            className="p-4 snap-center"
            style={{ flex: "0 0 25%" }}
          >
            <Card
              setInputDiv={setInputDiv}
              setUpdatedData={setUpdatedData}
              setActiveCard={setActiveCard}
              task={task}
              fetchGetTasks={fetchGetTasks}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Highlight;
