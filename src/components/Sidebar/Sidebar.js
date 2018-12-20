import React from "react";
import { observer } from "mobx-react";
// import own components
import SearchBar from "./SearchBar";
// import material ui components
import ListItem from "@material-ui/core/ListItem/ListItem";
import List from "@material-ui/core/List/List";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import SidebarStore from "./SidebarStore";
// import the ipc renderer to communicate with the electron app
const { ipcRenderer } = window.require("electron");

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        // initialize the sidebar store
        this.sidebarStore = new SidebarStore();
    }

    componentDidMount() {
        // add a listener to the channel "newUser" of the ipc to receive messages
        ipcRenderer.on("newUser", (event, message) => this.detectedNewUser(message));
    }

    detectedNewUser(ip) {
        // add the new ip to the user list
        let index = this.sidebarStore.ipList.indexOf(ip);
        if (index === -1) {
            this.sidebarStore.ipList.push(ip);
        }
    }

    render() {
        return (
            <div className={"Sidebar"} style={{ width: 250, height: "100%", position: "relative", float: "left", borderRight: "1px solid #292C33" }}>
                <SearchBar />
                <List>
                    {this.sidebarStore.ipList.map((ip, index) => (
                        <ListItem key={"listItem" + index} button style={{ color: "white" }}>
                            <ListItemText primary={ip} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

export default observer(Sidebar);
