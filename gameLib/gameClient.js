import { UIManager } from "./lib/uiManager";
import { KeyBoard } from "./lib/keyboard";
import { Mouse } from "./lib/mouse";
import { Network } from "./lib/netManager";

export class GameClient {

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