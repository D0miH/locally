import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import TextField from "./components/TextEntry/TextField";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ChatHistory from "./components/Chat/ChatHistory";

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
        windowSize: { width: window.innerWidth, height: window.innerHeight },
        messageHistory: []
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize.bind(this));
        this.setState({ windowSize: { width: window.innerWidth, height: window.innerHeight } });

        ipcRenderer.on("receivedMessage", (event, message) => this.receiveMessage(message));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize(e) {
        e.preventDefault();
        this.setState({ windowSize: { width: window.innerWidth, height: window.innerHeight } });
    }

    sendMessage(message) {
        let tmpArray = this.state.messageHistory;
        tmpArray.push({ received: false, text: message });

        ipcRenderer.send("sendMessage", message);
        this.setState({ messageHistory: tmpArray });
    }

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
                            width: this.state.windowSize.width - 251,
                            height: this.state.windowSize.height
                        }}
                    >
                        <ChatHistory windowSize={this.state.windowSize} messageHistory={this.state.messageHistory} />
                        <TextField windowSize={this.state.windowSize} sendMessage={(message) => this.sendMessage(message)} />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
