class WorldObject {
    /**
     *Creates an instance of WorldObject.
    * @memberof WorldObject
    */
    constructor(x, y, name, id) {

        this.id = id;
        this.x = x;
        this.y = x;
        this.name = "";

    }

    getId() {
        return this.id;
    }

    setX(x) {
        this.x = x;
        return this;
    }

    getX() {
        return this.x;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    getY() {
        return this.y;
    }

    setName(name) {
        
        this.name = name;
        return this;
    }

    getName() {
        return this.name;
    }
}

module.exports = WorldObject;