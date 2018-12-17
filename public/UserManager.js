const dgram = require("dgram");
const ip = require("ip");

class UserManager {
    constructor() {
        this.socket = dgram.createSocket("udp4");
        this.mainWindow = null;
    }

    /**
     * Listens for other users on the given port.
     * @param portNum
     */
    listenOnPort(portNum) {
        this._listeningPort = portNum;
        this.socket.bind(portNum);

        this.socket.on("listening", () => this.socket.setBroadcast(true));
    }

    /**
     * Answers to other users on the given port.
     * @param portNum
     */
    sendOnPort(portNum) {
        this._sendingPort = portNum;
    }

    /**
     * Broadcasts a message to discover other users in the network
     */
    checkForUsers() {
        // send other users a ping to get their data
        let ping = Buffer.from("ping");
        this.socket.send(ping, this._sendingPort, "255.255.255.255");
    }

    /**
     * Looks for new users and answers their detection request.
     */
    activate() {
        this.socket.on("message", this.onMessageReceived.bind(this));
    }

    /**
     * This function is called when a ping request was received.
     * @param msg   The message of the other user who sent the ping.
     * @param msgInfo   Some message information.
     */
    onMessageReceived(msg, msgInfo) {
        // if the message was sent by the user himself just return
        if (msgInfo.address === ip.address()) return;

        if (msg.toString() === "ping") {
            // if the message was a user detection request answer the request.
            this.sendData(msgInfo.address);
        } else if (msg.toString() === "pong") {
            // if the message was a answer to a detection request send the received ip to the web application
            this.mainWindow.webContents.send("newUser", msgInfo.address);
        }
    }

    /**
     * Sends the user data to a given address.
     * @param address
     */
    sendData(address) {
        let pong = Buffer.from("pong");
        this.socket.send(pong, this._sendingPort, address);
    }
}

module.exports = new UserManager();
