import React from "react";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
    sendButton: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        position: "absolute",
        right: 50
    },
    textField: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText
    }
});

class TextField extends React.Component {
    state = {
        messageValue: ""
    };

    onSend() {
        if (this.state.messageValue === "") return;

        console.log(this.state.messageValue);
        this.setState({ messageValue: "" });
    }

    render() {
        const { classes } = this.props;

        return (
            <div
                className={"TextField"}
                style={{
                    width: this.props.width,
                    position: "absolute",
                    bottom: 0,
                    height: 250,
                    borderTop: "1px solid #292C33",
                    padding: 20
                }}
            >
                <input
                    className={classes.textField}
                    type="text"
                    style={{
                        position: "absolute",
                        marginLeft: 0,
                        marginBottom: 10,
                        width: this.props.width * 0.75,
                        height: "85%",
                        outline: "none",
                        border: "1px solid #292C33",
                        padding: 10
                    }}
                    value={this.state.messageValue}
                    onKeyPress={(e) => (e.key === "Enter" ? this.onSend() : null)}
                    onChange={(e) => this.setState({ messageValue: e.target.value })}
                />
                <Button disableRipple className={classes.sendButton} onClick={() => this.onSend()}>
                    Send
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(TextField);
