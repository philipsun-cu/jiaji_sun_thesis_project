import React from "react";
import logo from "./logo.svg";
import "./App.css";
import BasicMap from "./Leaflet/basic.js";


function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  React.useEffect(() => {
    fetch("/api/locations")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    
    <div className="App">
      {/* <p>Sun</p> */}

      <BasicMap>

      </BasicMap>
      

      
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header> */}
    </div>
  );
}

export default App;