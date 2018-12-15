import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// import the icons
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

const { ipcRenderer } = window.require("electron");

const styles = (theme) => ({
    containerDiv: {
        padding: 0,
        height: 25,
        borderBottom: "1px solid " + theme.palette.primary.dark
    },
    inputField: {
        backgroundColor: theme.palette.primary.light,
        float: "right",
        outline: "none",
        padding: 5,
        border: "none",
        height: 25,
        width: 200,
        boxSizing: "border-box"
    },
    refreshDiv: {
        backgroundColor: theme.palette.primary.main,
        width: 25,
        height: 25,
        float: "left"
    },
    searchSymbol: {
        width: 25,
        height: 25,
        float: "right",
        backgroundColor: theme.palette.primary.light
    },
    searchIcon: {
        color: theme.palette.primary.main
    },
    refreshIcon: {
        color: theme.palette.primary.light
    }
});

class SearchBar extends React.Component {

    checkForUsers = function() {
        ipcRenderer.send("checkForUsers");
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.containerDiv}>
                <div className={classes.refreshDiv} onClick={this.checkForUsers}>
                    <RefreshIcon className={classes.refreshIcon} />
                </div>
                <div className={classes.searchSymbol}>
                    <SearchIcon className={classes.searchIcon} />
                </div>
                <input className={classes.inputField} type="text" />
            </div>
        );
    }
}

export default withStyles(styles)(SearchBar);
