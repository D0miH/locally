import React from "react";
import SearchBar from "./SearchBar";

class Sidebar extends React.Component {
    render() {
        return (
            <div className={"Sidebar"} style={{ width: 250, height: "100%", position: "relative", float: "left", borderRight: "1px solid #292C33" }}>
                <SearchBar />
            </div>
        );
    }
}

export default Sidebar;
