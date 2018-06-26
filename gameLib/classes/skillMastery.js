let Skill = require("./skill");
class SkillMastery {

    constructor(id, name){

        this.id = id;
        this.name = name;
        this.skills = {};
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    addSkill(skill){

        this.skills[skill.getId()] = skill;
        return this;
    }

    getSkills(){
        return this.skills;
    }

    getSkillById(skillId){

        return this.skills[skillId];
    }
}

module.exports = SkillMastery;