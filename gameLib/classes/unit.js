import { WorldObject } from "./worldObject"

/**
 * A unit is a class that represents an object in the world that has HP, level, speed , attack and defense attributes. Also can attack to other units and move
 * Unit also can use items.
 * A Unit can be applied altered statuses from other units
 *
 * @class Unit
 * @extends {WorldObject}
 */
export class Unit extends WorldObject {

    constructor(x, y, name, id) {
        super(x, y, name, id);
        this.hp = 0;
        this.hpMax = 0;
        this.mp = 0;
        this.mpMax = 0;

        this.level = 0;
        this.exp = 0; // experience points
        this.sp = 0; // skill points
        this.phyAttack = 0;
        this.magAttack = 0;
        this.phyDef = 0;
        this.magDef = 0;
        this.speed = 0;
        this.status = {}
        this.skills = {}

    }

    setHp(hp) {
        
        if (hp > this.hpMax) hp = this.hpMax;
        this.hp = hp;
        return this;
    }

    getHp() {
        return this.hp;
    }

    getHpMax() {
        return this.hpMax;
    }

    getMp() {
        return this.mp;
    }

    getMpMax() {
        return this.getMpMax;
    }
    
    getPhyAttack() {
        return this.phyAttack;
    }

    setPhyAttack(atk) {
        
        this.phyAttack = atk;
        return this;
    }

    getMagAttack(atk) {
        this.magAttack = atk;
        return this;
    }

    setMagAttack(atk) {
        this.magAttack = atk;
        return this;
    }

    getPhyDef() {
        return this.phyDef;
    }

    setPhyDef(def) {
        this.phyDef = def;
        return this;
    }

    getMagDef(def) {
        return this.magDef;
    }

    setMagDef(def) {
        this.magDef = def;
        return this;
    }

    getSpeed() {
        
        return this.speed;
    }

    setSpeed(speed) {
        
        this.speed = speed;
        return this;
    }

    // Get all statuses
    getStatuses() {
        
        return this.status;
    }

    // apply a status to this unit
    inflictStatus(status) {
        this.status[status.getType()] = status;
        return this;
    }

    processAllStatuses() {
        
        for (var s in this.getStatuses()) {
            
            var stat = this.status[s];
            stat.process(this);
        }
    }

    getSkills() {
        return this.skills;
    }

    addSkill(skill) {
        this.skills[skill.getId()] = skill;
        return this;
    }

    getSkillById(skillId) {
        
        return this.skills[skillId];
    }

    removeSkillById(skillId) {
        
        delete this.skills[skillId];
        return this;
    }


    // damage this unit. If hp falls to 0 , die() is called
    damage(dmg) {
        
        var newHp = (this.hp - dmg);
        if (newHp < 0) {
            this.hp = 0;
            this.die();
        }
        else this.hp = newHp;
    }

    // abstract 
    die() {
        
    }

    // levels up this unit
    levelUp() {
        ++this.level;
        return this;
    }

    getLevel() {
        return this.level;
    }

    getExp() {
        this.exp;
    }

    getSp() {
        this.sp;
    }

    // checks if this unit is alive
    isAlive() {
        return this.hp > 0;
    }

    // abstract 
    attackTo(unit){}

    // abstract
    move() { }

    // abstract
    pickItemAt(posX, posY) {
        
    }
    
    // abstract
    useItem(item) {
        
    }

    // abstract
    dropItemAt(item) {

    }

    // abstract
    draw(ctx) {

    }
}