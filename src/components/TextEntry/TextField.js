import React from "react";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
    sendButton: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        position: "absolute",
        right: 60
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

    onSend(e) {
        e.preventDefault();
        if (this.state.messageValue === "") return;

        this.props.sendMessage(this.state.messageValue);

        this.setState({ messageValue: "" });
    }

    render() {
        const { classes } = this.props;

        return (
            <div
                className={"TextField"}
                style={{
                    width: this.props.windowSize.width - 251,
                    position: "absolute",
                    bottom: 0,
                    height: 100,
                    borderTop: "1px solid #292C33",
                    padding: 10,
                    boxSizing: "border-box"
                }}
            >
                <textarea
                    className={classes.textField}
                    type="text"
                    style={{
                        position: "absolute",
                        width: this.props.windowSize.width - 251 - 200,
                        maxHeight: 80,
                        resize: "none",
                        wordWrap: "break-word",
                        outline: "none",
                        border: "1px solid #292C33",
                        height: 90,
                        fontSize: 12,
                        boxSizing: "border-box",
                        padding: 5
                    }}
                    value={this.state.messageValue}
                    onKeyPress={(e) => (e.key === "Enter" ? this.onSend(e) : null)}
                    onChange={(e) => this.setState({ messageValue: e.target.value })}
                />
                <Button disableRipple className={classes.sendButton} onClick={(e) => this.onSend(e)}>
                    Send
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(TextField);
