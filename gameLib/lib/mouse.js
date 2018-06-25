export class Mouse {

    constructor(callbacks = {}){

        this.buttons = {};
        this.callbacks = {
            "contextmenu": callbacks.contextmenu,
            "mousedown": callbacks.mousedown,
            "mouseup": callbacks.mouseup,
            "click": callbacks.click
        };

        document.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            if (typeof this.callbacks.contextmenu === "function") {
                this.callbacks.contextmenu(e);
            }
        }, false);

        document.addEventListener("mousedown", (e) => {

            this.buttons[e.button] = true;
            if (typeof this.callbacks.mousedown === "function") {
                this.callbacks.mousedown(e);
            }
        });

        document.addEventListener("mouseup", (e)=> {
            this.buttons[e.button] = false;
            if (typeof this.callbacks.mouseup === "function") {
                this.callbacks.mouseup(e);
            }
        });

        document.addEventListener("click", (e)=> {
            if (typeof this.callbacks.click === "function") {
                this.callbacks.click(e);
            }
        });
    }

    isPressed(key){

        return this.buttons[key] && true;
    }
}

Mouse.BUTTONS = {
    LEFT: 0,
    RIGHT:2
}