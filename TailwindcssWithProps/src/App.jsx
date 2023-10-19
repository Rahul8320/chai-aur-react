import { Card } from "./Card";

function App() {
  return (
    <div className="container mx-auto w-1/3 mt-32 max-h-screen">
      <h1 className="text-center text-black rounded-xl p-4 bg-green-400 mb-16">
        Tailwind css test
      </h1>

      <Card name="Macbook" description="M2 mac pro" />
      <Card name="Dell G15" description="Windows 11" />
    </div>
  );
}

export default App;
