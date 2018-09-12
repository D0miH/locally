import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import TextField from "./components/TextEntry/TextField";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#3E424C",
            light: "#494D59",
            dark: "#292C33",
            contrastText: "#B0BBD9"
        }
    }
});

class App extends React.Component {
    state = {
        windowWidth: window.innerWidth
    };

    componentDidMount() {
        window.addEventListener("resize", (e) => this.handleResize(e));
        this.setState({ windowWidth: window.innerWidth });
    }

    handleResize(e) {
        e.preventDefault();
        this.setState({ windowWidth: window.innerWidth });
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App" style={{ backgroundColor: "#3E424C", width: "100%", height: "100%" }}>
                    <Sidebar />

                    <div
                        className={"AppContent"}
                        style={{ position: "relative", float: "left", width: this.state.windowWidth - 251, height: "100%" }}
                    >
                        <TextField width={this.state.windowWidth - 251} />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
