console.log("Im b");

class Rect {

    constructor(w, h){

        this.x = 0;
        this.y = 0;
        this.width = w;
        this.height = h;
    }

    area(){

        return this.width * this.height;
    }
}

const rec = new Rect(20, 40);
console.log(rec.area());

// version vieja
module.exports = Rect;