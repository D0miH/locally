import React from "react";
import SearchBar from "./SearchBar";
import ListItem from "@material-ui/core/ListItem/ListItem";
import List from "@material-ui/core/List/List";
const { ipcRenderer } = window.require("electron");

class Sidebar extends React.Component {
    state = {
        userList: []
    };

    componentDidMount() {
        // add a listener to the channel "newUser" of the ipc to receive messages
        ipcRenderer.on("newUser", (event, message) => this.detectedNewUser(message));
    }

    detectedNewUser(ip) {
        // add the new ip to the user list
        let tmpList = this.state.userList;
        tmpList.push(ip);
        this.setState({ userList: tmpList });
    }

    getListItems() {
        let list = [];
        this.state.userList.forEach((ip, index) => {
            list.push(<ListItem key={"listItem" + index} primary={ip} button />);
        });
    }

    render() {
        return (
            <div className={"Sidebar"} style={{ width: 250, height: "100%", position: "relative", float: "left", borderRight: "1px solid #292C33" }}>
                <SearchBar />
                <List>{this.getListItems()}</List>
            </div>
        );
    }
}

export default Sidebar;
