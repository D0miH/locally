import React from "react";
import Button from "@material-ui/core/Button/Button";

class TextField extends React.Component {
    state = {
        messageValue: ""
    };

    render() {
        return (
            <div className={"TextField"} style={{ width: "100%", position: "absolute", bottom: 0, height: 250, border: "1px solid black" }}>
                <input type="text" style={{ width: "50%", height: "100%" }} onChange={(e) => this.setState({ messageValue: e.target.value })} />
                <Button
                    onClick={() => {
                        console.log(this.state.messageValue);
                    }}
                >
                    Send
                </Button>
            </div>
        );
    }
}

export default TextField;
