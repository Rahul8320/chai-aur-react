import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(13);

  const orderChai = () => {
    if (count >= 20) {
      alert("Max order limit reached! Please try again later");
    } else {
      setCount((v) => v + 1);
    }
  };

  const cancelChai = () => {
    if (count > 0) {
      setCount((v) => v - 1);
    } else {
      alert("You don't have any pending order!");
    }
  };

  return (
    <div>
      <h1>Chai Counter</h1>
      <hr />
      <h3>
        Current Pending Order :{" "}
        <span
          style={{
            fontSize: "22px",
            fontStyle: "italic",
            fontFamily: "cursive",
            marginLeft: 7,
          }}
        >
          {count}
        </span>
      </h3>
      <hr />
      <button
        style={{ marginTop: 10 }}
        onClick={orderChai}
        // disabled={count >= 20}
      >
        Order Chai
      </button>
      <button
        style={{ marginLeft: 25 }}
        onClick={cancelChai}
        // disabled={!count}
      >
        Cancel Chai
      </button>
    </div>
  );
}

export default App;
