const dgram = require("dgram");

module.exports = class Sender {

    constructor() {
        // create the socket
        this.socket = dgram.createSocket("udp4");
    }

    /**
     * Binds the socket to a given port and listens for messages.
     * @param portNum
     */
    listenOnPort(portNum) {
        this.listeningPort = portNum;
        this.socket.bind(portNum);

        // need to broadcast
        this.socket.on("listening", () => this.socket.setBroadcast(true));
    }

    /**
     * Sets the port through which messages are sent.
     * @param portNum
     */
    sendOnPort(portNum) {
        this.sendingPort = portNum;
    }

    /**
     * Closes the socket.
     */
    close() {
        this.socket.close();
    }

    /**
     * When a message is received the given callback is executed.
     * @param callback
     */
    onMessageReceived(callback) {
        this.socket.on("message", (msg, msgInfo) => callback(msg, msgInfo));
    }

    /**
     * Sends the given message to the given ip address.
     * @param msg
     * @param address
     */
    sendMessage(msg, address) {
        let message = Buffer.from(msg);
        this.socket.send(message, this.sendingPort, address);
    }
};