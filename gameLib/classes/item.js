import { WorldObject } from "./worldObject"

/**
 * An item is a WorldObject that can be used, picked up and droped from an Unit
 *
 * @class Item
 * @extends {WorldObject}
 */
class Item extends WorldObject {

    constructor(x,y,name,id) {
        super(x, y, name, id);

    }

    // abstract
    pickUpAt(posX, posY) {
        
    }

    // abstract
    use() {
        
    }

    // abstract
    dropAt(posX, posY) {
        
    }
}