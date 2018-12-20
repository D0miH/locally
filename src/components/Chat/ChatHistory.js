import React from "react";
import Message from "./Message";
import withStyles from "@material-ui/core/styles/withStyles";
import { observer } from "mobx-react";

const style = (theme) => ({
    chatRoom: {
        position: "absolute",
        marginTop: 0,
        padding: 0
    },
    messageHistory: {
        top: 0,
        listStyleType: "none",
        overflowY: "scroll"
    },
    dummyMessage: {
        color: theme.palette.primary.light
    }
});

class ChatHistory extends React.Component {
    messageHistoryRef = null;

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if the component did update and rerender scroll all the way to the bottom
        this.messageHistoryRef.scrollTop = this.messageHistoryRef.scrollHeight;
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.chatRoom} style={{ width: this.props.windowSize.width - 251, height: this.props.windowSize.height - 101 }}>
                <div
                    className={classes.messageHistory}
                    style={{ height: this.props.windowSize.height - 101 }}
                    ref={(x) => (this.messageHistoryRef = x)}
                >
                    {this.props.messageHistory.length === 0 ? (
                        <div className={classes.dummyMessage} style={{ marginTop: (this.props.windowSize.height - 251) / 2, textAlign: "center" }}>
                            No messages have been sent
                        </div>
                    ) : (
                        this.props.messageHistory.map((message, index) => <Message text={message.text} received={message.received} key={index} />)
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(style)(observer(ChatHistory));
