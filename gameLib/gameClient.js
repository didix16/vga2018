let UIManager = require("./lib/uiManager");
let KeyBoard = require("./lib/keyboard");
let Mouse = require("./lib/mouse");
let Network = require("./lib/netManager");

class GameClient {
    constructor() {

        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        document.body.appendChild(canvas);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        this.ctx = ctx;
        this.UIManager = new UIManager(ctx);
        this.keyboard = new KeyBoard();
        this.mouse = new Mouse();
        this.netManager = new Network();
        this.map = null;
        this.me = null;
    }

    render() {
        
    }
}

module.exports = GameClient;