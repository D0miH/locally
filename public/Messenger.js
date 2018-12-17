const dgram = require("dgram");
const ip = require("ip");

class Messenger {
    constructor() {
        // create the socket
        this.socket = dgram.createSocket("udp4");
        this.mainWindow = null;
    }

    /**
     * Binds the socket to a given port and listens for messages.
     * @param portNum
     */
    listenOnPort(portNum) {
        this._listeningPort = portNum;
        this.socket.bind(portNum);

        // need to broadcast
        this.socket.on("listening", () => this.socket.setBroadcast(true));
        this.socket.on("message", this.onMessageReceived.bind(this));
    }

    /**
     * Sets the port through which messages are sent.
     * @param portNum
     */
    sendOnPort(portNum) {
        this._sendingPort = portNum;
    }

    /**
     * Closes the socket.
     */
    close() {
        this.socket.close();
    }

    /**
     * This function is called when a message was received.
     * @param msg   The received message.
     * @param msgInfo   Some information about the received message.
     */
    onMessageReceived(msg, msgInfo) {
        if (msgInfo.address === ip.address()) {
            // if the source address is the own ip address return
            return;
        } else {
            // else forward the message the the app
            this.mainWindow.webContents.send("receivedMessage", msg.toString());
        }
    }

    /**
     * Sends the given message to the given ip address.
     * @param msg
     * @param address
     */
    sendMessage(msg, address) {
        let message = Buffer.from(msg);
        this.socket.send(message, this._sendingPort, address);
    }
}

module.exports = new Messenger();
