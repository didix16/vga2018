import { WorldMap } from "./worldMap";

/**
 * The World is the whole space where the WorldMaps lives
 *
 * @class World
 */
class World {

    constructor(id) {
        this.id = id;
        this.maps = {}
    }

    getId() {
        return this.id;
    }

    addMap(map) {
        
        this.maps[map.getId()] = map;
    }

    createMap() {
        
    }

    removeMap(mapId) {
        
        delete this.maps[mapId];
    }

    getMaps() {
        return this.maps;
    }
}