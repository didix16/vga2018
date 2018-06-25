/**
 * A status is an action that do something with a unit. May damage, health, boost stats, etc
 *
 * @class Status
 */
export class Status {

    static TYPES = {
        health: "health",
        damage: "damage",
        buff: "buff",
        debuff: "debuff"
    };

    constructor(type) {
        
        this.type = type;
    }

    getType() {
        return this.type;
    }

    /**
     * The interface method to be called when the status is processed to a unit
     *
     * @memberof Status
     */
    process(unit) {
        
    }
}