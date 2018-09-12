import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const style = (theme) => ({
    message: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
        color: theme.palette.primary.contrastText,
        fontWeight: "lighter",
        letterSpacing: 2,
        maxWidth: 150,
        wordWrap: "break-word"
    }
});

class Message extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div style={{ width: "100%", height: "auto", float: this.props.received ? "left" : "right" }}>
                <div className={classes.message} style={{ float: this.props.received ? "left" : "right" }}>
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default withStyles(style)(Message);
