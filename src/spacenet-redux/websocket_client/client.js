import { SocketEvents } from "utils/constants";


export default class Websocket {
  wsUrl;
  conn;
  eventCallback;

  constructor() {
    // this.wsUrl = url
    this.conn = null;
    this.eventCallback = null;
    // conn = new Websocket(this.wsUrl)
    // this.initialize(conn)
  }

  getWebsocket() {
    return this.ws
  }

  setWebsocket(ws) {
    this.ws = ws
  }

  initialize(connUrl) {
    if (this.conn) {
      return
    }

    this.conn = new Websocket(connUrl)

    this.conn.onopen = function (e) {
      console.log("[open] Connection established");
    }

    this.conn.onclose = function(event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
      }
    };

    this.conn.onerror = function(error) {
      console.log(`[error] ${error.message}`);
    };

    this.conn.onmessage = function(event) {
      const msg = JSON.parse(event.data);

      if (this.eventCallback) {
        console.log(msg)
        if (msg.event === SocketEvents.HELLO) {
          console.log('got connection id ', msg.data.connectionId);

          if (this.connectionId !== '' && this.connectionId !== msg.data.connection_id) {
            console.log('long timeout, or server restart, or sequence number is not found.'); //eslint-disable-line no-console
          }

          this.connectionId = msg.data.connectionId;
        }

        this.eventCallback(msg)
      }

    }
  }

  setEventCallback(callback) {
    this.eventCallback = callback;
  }
}