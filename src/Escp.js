import { io } from 'socket.io-client';

export default class Escp {
    constructor(host="localhost", port='3000', token='12345') {
        this.host = host;
        this.port = port;
        this.token = token;
        
        this.raw = "";
        this.esc = "\x1B";
        this.currentLine = 0;
        this.currentPage = 0;
    }

    reset() {
        this.raw+=this.esc+"\x40";
        if (this.currentLine == 0 && this.currentPage == 0) {
            this.currentLine++;
            this.currentPage++;
        } else {
            this.currentLine = 0;
            this.currentPage = 0;
        }

        return this;
    }

    /*
    params:
    cpiHex, default 10cpi 
    lpiHex, default 8lpi
    lmHex, default 0 (Left Margin)
    rmHex, default 0 (Right Margin) for width 8,5Inch enter 85 for 10cpi
    plHex, default 44 Line (Page Length) 
    bmHex, default 0 Line (Bottom Margin)
    */
    setPrinterArea(cpiHex="\x50", lpiHex="\x30", lmHex="\x00", rmHex="\x55", plHex="\x2C", bmHex="\x00") {
        //set cpi ESC P (10 cpi)
        this.raw+=this.esc+cpiHex;
        //set lpi
        this.raw+=this.esc+lpiHex;
        //set left margin
        this.raw+=this.esc+"\x6C"+lmHex;
        //set right margin
        this.raw+=this.esc+"\x51"+rmHex;
        //set page length
        this.raw+=this.esc+"\x43"+plHex;
        //set bottom margin
        this.raw+=this.esc+"\x4E"+bmHex;

        return this;
    }

    newLine() {
        this.raw+="\x0D"+"\x0A"; //CR LF

        this.currentLine++;
        return this;
    }

    newPage() {
        this.raw+="\x0C"; //FF

        this.currentLine = 1;
        this.currentPage++;
        return this;
    }

    text(text, textAreaLength=0, left=true) {
        if (text.length < textAreaLength) {
            text = text.substr(0, textAreaLength);
        }
        let rawText = "";
        const rawSpace = "\x20".repeat(textAreaLength-text.length);
        if (left) {rawText+=text+rawSpace}
        else {rawText+=rawSpace+text}
        this.raw+=rawText;
        return this
    }

    sendRaw() {
        const socket = io("http://"+`${this.host}:${this.port}`, {
            auth: {
                token: this.token,
            }
        });
        socket.on('connect_error', (error) => {console.log(error.message)})
        socket.emit('printing', this.raw)
        setTimeout(() => {
            socket.close();
        }, 3000);
    }
}