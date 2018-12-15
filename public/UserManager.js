const dgram = require("dgram");

class UserManager {

    constructor() {
        this.socket = dgram.createSocket("udp4");
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

        console.log("ping");
    }

    /**
     * The given callback is executed when a ping is received.
     * @param callback
     */
    onPingReceived(callback) {
        this.socket.on("message", (msg, msgInfo) => callback(msg, msgInfo));
    }

    sendData(address) {
        let pong = Buffer.from("pong");
        this.socket.send(pong, this._sendingPort, address);
    }
}

module.exports = new UserManager();