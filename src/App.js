import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import TextField from "./components/TextEntry/TextField";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ChatHistory from "./components/Chat/ChatHistory";
import AppStore from "./AppStore";
import { observer } from "mobx-react";

const { ipcRenderer } = window.require("electron");

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#3E424C",
            light: "#606571",
            dark: "#292C33",
            contrastText: "#ffffff"
        }
    }
});

class App extends React.Component {
    state = {
        messageHistory: []
    };

    constructor(props) {
        super(props);

        // intantiate the app store
        this.appStore = new AppStore();
    }

    componentDidMount() {
        // add an event listener to handle resizing of the window
        window.addEventListener("resize", this.handleResize.bind(this));
        this.appStore.uiStore.setWindowSize(window.innerWidth, window.innerHeight);

        // add a listener to the channel "receivedMessage" of the ipc to receive messages
        ipcRenderer.on("receivedMessage", (event, message) => this.receiveMessage(message));
    }

    componentWillUnmount() {
        // when the component is going to be unmounted remove the event listener for resizing the window
        window.removeEventListener("resize", this.handleResize);
    }

    /**
     * Handles the resizing of the window.
     * @param e The resizing event.
     */
    handleResize(e) {
        this.appStore.uiStore.setWindowSize(window.innerWidth, window.innerHeight);
        e.preventDefault();
    }

    /**
     * Sends a message.
     * @param message   The message that is going to be sent.
     */
    sendMessage(message) {
        // get the current history and add the message to the local chat history
        let tmpArray = this.state.messageHistory;
        tmpArray.push({ received: false, text: message });
        // update the message history
        this.setState({ messageHistory: tmpArray });

        // send the message to the main process to send it using sockets
        ipcRenderer.send("sendMessage", message);
    }

    /**
     * This function is called when a new message is received. The received message is added to the chat history.
     * @param message   The message that was received.
     */
    receiveMessage(message) {
        let tmpArray = this.state.messageHistory;
        tmpArray.push({ received: true, text: message });
        this.setState({ messageHistory: tmpArray });
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App" style={{ backgroundColor: "#3E424C", width: "100%", height: "100%" }}>
                    <Sidebar />

                    <div
                        className={"AppContent"}
                        style={{
                            position: "relative",
                            float: "left",
                            width: this.appStore.uiStore.windowSize.width - 251,
                            height: this.appStore.uiStore.windowSize.height
                        }}
                    >
                        <ChatHistory windowSize={this.appStore.uiStore.windowSize} messageHistory={this.state.messageHistory} />
                        <TextField windowSize={this.appStore.uiStore.windowSize} sendMessage={(message) => this.sendMessage(message)} />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default observer(App);
