import { useState } from "react";
import CustomButton from "./CustomButton";

function App() {
  const [color, setColor] = useState("olive");

  const changeBackground = (bgColor) => {
    setColor(bgColor);
  };

  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}
    >
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-4 py-2 rounded-xl">
          <CustomButton name="olive" onClickHandler={changeBackground} />
          <CustomButton name="red" onClickHandler={changeBackground} />
          <CustomButton name="green" onClickHandler={changeBackground} />
          <CustomButton name="blue" onClickHandler={changeBackground} />
          <CustomButton name="black" onClickHandler={changeBackground} />
          <CustomButton name="tomato" onClickHandler={changeBackground} />
          <CustomButton name="chocolate" onClickHandler={changeBackground} />
          <CustomButton name="purple" onClickHandler={changeBackground} />
          <CustomButton name="pink" onClickHandler={changeBackground} />
          <CustomButton name="maroon" onClickHandler={changeBackground} />
        </div>
      </div>
    </div>
  );
}

export default App;
