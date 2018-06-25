export class KeyBoard {

    constructor(){

        this.keys = {};
        document.addEventListener("keydown", (e) => {

            this.keys[e.key] = true;
        });

        document.addEventListener("keyup", (e)=> {
            this.keys[e.key] = false;
        });
    }

    isPressed(key){

        return this.keys[key] && true;
    }
}

KeyBoard.KEYS = {
        
    A: 'a',
    W: 'w',
    D: 'd',
    S: 's',
    SPACE: " ",
    SHIFT: "Shift",
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight"

};