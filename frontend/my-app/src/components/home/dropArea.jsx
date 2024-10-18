import React, { useState } from "react";

const DropArea = ({ onDrop }) => {
  const [showDropArea, setShowDropArea] = useState(false);

  return (
    <section
      onDragEnter={() => setShowDropArea(true)}
      onDragLeave={() => setShowDropArea(false)}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
        setShowDropArea(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={`flex fixed items-center justify-center absolute top-0 left-0 right-0 w-full h-screen bottom-0 ${
        showDropArea
          ? " bg-gray-400/30 z-50 opacity-100 transition-all duration-300"
          : "opacity-0 transition-all duration-300"
      }`}
    >
      Drop here
    </section>
  );
};

export default DropArea;
