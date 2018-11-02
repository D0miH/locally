import React from "react";
import SearchBar from "./SearchBar";
import ListItem from "@material-ui/core/ListItem/ListItem";
import List from "@material-ui/core/List/List";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
const { ipcRenderer } = window.require("electron");

class Sidebar extends React.Component {
    state = {
        ipList: [],
        userList: []
    };

    componentDidMount() {
        // add a listener to the channel "newUser" of the ipc to receive messages
        ipcRenderer.on("newUser", (event, message) => this.detectedNewUser(message));
    }

    detectedNewUser(ip) {
        // add the new ip to the user list
        let tmpList = this.state.ipList;
        let index = tmpList.indexOf(ip);
        if (index === -1) {
            tmpList.push(ip);
        } else {
            return;
        }
        this.setState({ ipList: tmpList });
        this.getListItems();
    }

    getListItems() {
        let list = [];
        this.state.ipList.forEach((ip, index) => {
            list.push(
                <ListItem key={"listItem" + index} button style={{ color: "white" }}>
                    <ListItemText primary={ip} />
                </ListItem>
            );
        });
        this.setState({ userList: list });
    }

    render() {
        return (
            <div className={"Sidebar"} style={{ width: 250, height: "100%", position: "relative", float: "left", borderRight: "1px solid #292C33" }}>
                <SearchBar />
                <List>{this.state.userList}</List>
            </div>
        );
    }
}

export default Sidebar;
