import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import TextField from "./components/TextEntry/TextField";

class App extends React.Component {
    render() {
        console.log(window.screen);
        return (
            <div className="App" style={{ backgroundColor: "#3E424C", width: "100%", height: "100%" }}>
                <Sidebar />

                <div className={"AppContent"} style={{ position: "relative", float: "left", width: window.innerWidth - 251, height: "100%" }}>
                    <TextField />
                </div>
            </div>
        );
    }
}

export default App;
