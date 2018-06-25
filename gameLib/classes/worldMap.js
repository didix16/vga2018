import { WorldObject } from "./worldObject";

/**
 * A WorldMap is a subspace of a World that holds WorldObjects
 *
 * @export
 * @class WorldMap
 */
export class WorldMap {

    constructor(id, name, dimension) {
        this.id = id;
        this.name = name;
        this.dimension = dimension;
        this.currentObjId = -1;
        this.objects = {}
    }

    getNextId() {

        return ++this.currentObjId;
    }

    createWorldObject(posX, posY, name) {
        
        let obj = new WorldObject(posX, posY, name, this.getNextId());
        return obj;
    }

    addObject(object) {

        this.objects[object.getId()] = object;
    }

    removeObject(objectId) {
        
        delete this.objects[objectId];
    }

    getObjects() {
        return this.objects;
    }
}