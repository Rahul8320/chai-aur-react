import { useCallback, useEffect, useRef, useState } from "react";
import { TbClipboardText } from "react-icons/tb";
import { BsArrowRepeat } from "react-icons/bs";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const [timeTaken, setTimeTaken] = useState(0);
  const [loading, setLoading] = useState(false);

  // useRef hook
  const passwordRef = useRef(null);

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

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const guessCurrentPassword = async () => {
    setLoading(true);
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*(){}[]`_+:<>";

    let guessPassword = "";
    var start = new Date().getTime();

    for (let index = 0; index < length; index++) {
      for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === password[index]) {
          await sleep(Math.floor(Math.random() * 100 + 250));
          guessPassword += str.charAt(i);
          break;
        }
      }
    }
    var end = new Date().getTime();
    var time = end - start;
    setTimeTaken(time);

    setLoading(false);
    console.log(guessPassword, time);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto shadow-md rounded-lg px-4 py-6 mt-20 text-orange-500 bg-slate-700">
        <h1 className="text-3xl text-center text-white">Password Generator</h1>
        <div className="mt-5 flex shadow rounded-lg overflow-hidden mx-10 mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3 text-2xl font-mono"
            value={password}
            placeholder="password"
            ref={passwordRef}
            readOnly
          />
          <button
            onClick={copyPasswordToClipboard}
            className="px-3 py-0.5 shrink-0 outline-none bg-blue-700 text-lg text-white hover:shadow-lg hover:bg-blue-800"
          >
            <span className="flex items-center gap-x-1">
              <TbClipboardText />
              Copy
            </span>
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
              <span className="flex items-center gap-x-1">
                <BsArrowRepeat />
                Generate New
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto shadow-md rounded-lg px-4 py-6 mt-24 text-orange-500 bg-slate-700">
        <h1 className="text-2xl text-center text-white">
          Check how many guesses computer need to guess your password
        </h1>

        <div className="mt-5 overflow-hidden mx-10 mb-4">
          {timeTaken > 0 && (
            <h2 className="text-2xl">
              Approx time taken: {timeTaken / 1000} seconds
            </h2>
          )}

          <button
            disabled={loading}
            onClick={guessCurrentPassword}
            className="mt-5 rounded-md px-3 py-0.5 shrink-0 outline-none bg-blue-700 text-lg text-white hover:shadow-lg hover:bg-blue-800 disabled:bg-gray-400"
          >
            Guess Now
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
