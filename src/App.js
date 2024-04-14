import Body from "./components/Body";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex">
        <div className="w-full bg-red-200 h-[100vh]" >
          <Body />
        </div>
      </div>
    </div>
  );
}

export default App;
