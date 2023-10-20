import { useCallback, useEffect, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let newPassword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*(){}[]`_+:<>";

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      newPassword += str.charAt(index);
    }
    setPassword(newPassword);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="w-full max-w-4xl mx-auto shadow-md rounded-lg px-4 py-6 mt-20 text-orange-500 bg-slate-700">
      <h1 className="text-3xl text-center text-white">Password Generator</h1>
      <div className="mt-5 flex shadow rounded-lg overflow-hidden mx-10 mb-4">
        <input
          type="text"
          className="outline-none w-full py-1 px-3 text-2xl font-mono"
          value={password}
          placeholder="password"
          readOnly
        />
        <button className="px-3 py-0.5 shrink-0 outline-none bg-blue-700 text-lg text-white">
          Copy
        </button>
      </div>
      <div className="flex text-md font-medium gap-x-7 mx-16">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={50}
            name="length"
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => setNumberAllowed((val) => !val)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => setCharAllowed((val) => !val)}
          />
          <label htmlFor="charInput">Special Characters</label>
        </div>
        <div className="flex items-center gap-x-1">
          <button
            className="outline-none cursor-pointer hover:text-indigo-500 hover:underline hover:underline-offset-2 decoration-orange-500"
            onClick={passwordGenerator}
          >
            Generate New
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
