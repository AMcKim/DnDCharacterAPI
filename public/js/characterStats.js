var Character = {};

const saveProfsList = [
    {elementName : "Str", profName : "strength"},
    {elementName : "Dex", profName : "dexterity"},
    {elementName : "Con", profName : "constitution"},
    {elementName : "Int", profName : "intelligence"},
    {elementName : "Wis", profName : "wisdom"},
    {elementName : "Cha", profName : "charisma"}
]

const skillList = [
    {elementName: "Acrobatics", profName: "acrobatics", ability : "Dex"},
    {elementName: "Animal", profName: "animal-handling", ability : "Wis"},
    {elementName: "Arcana", profName: "arcana", ability : "Int"},
    {elementName: "Athletics", profName: "athletics", ability : "Str"},
    {elementName: "Deception", profName: "deception", ability : "Cha"},
    {elementName: "History", profName: "history", ability : "Int"},
    {elementName: "Insight", profName: "insight", ability : "Wis"},
    {elementName: "Intimidation", profName: "intimidation", ability : "Cha"},
    {elementName: "Investigation", profName: "investigation", ability : "Int"},
    {elementName: "Medicine", profName: "medicine", ability : "Wis"},
    {elementName: "Nature", profName: "nature", ability : "Int"},
    {elementName: "Perception", profName: "perception", ability : "Wis"},
    {elementName: "Performance", profName: "performance", ability : "Cha"},
    {elementName: "Persuasion", profName: "persuasion", ability : "Cha"},
    {elementName: "Religion", profName: "religion", ability : "Int"},
    {elementName: "Sleight", profName: "sleight-of-hand", ability : "Dex"},
    {elementName: "Stealth", profName: "stealth", ability : "Dex"},
    {elementName: "Survival", profName: "survival", ability : "Wis"}
]

const GetStats = (id) => {
    fetch('/getCharacters/' + id, {method : "get"}).then((Response) => {
        return Response.json();
    }).then((stats)=> {
        CharacterGetSuccess(stats);
    }).then((stats) => {
        DisplayCharacterInfo(Character)
    });
}

function CharacterGetSuccess(stats) {
    Character = stats;
}

function DisplayCharacterInfo(Character) {
    DisplayName(Character);
    DisplayScores(Character, saveProfsList);
    DisplayAbilityMods(Character, saveProfsList);
    DisplayProfs(saveProfsList, Character["save-profs"]);
    DisplaySavingBonuses(saveProfsList);

    DisplayCharacterWeapons(Character["weapons"]);

    DisplayProfs(skillList, Character["skill-profs"]);

    if(Character.hasOwnProperty("skill-exp")) {
        DisplayExpertise(skillList, Character["skill-exp"]);
    }

    else {
       DisplayExpertise(skillList, [0]);
    }
    
    DisplaySkillBonuses(skillList);
}

const DeriveAbilityModifier = (score) => Math.floor(score/2) -5;

const CheckProfs = (characterProfs, ability) => characterProfs.includes(ability);

function DisplayName(Character) {
    $("#characterName").val(Character["name"]);
    $("#className").val(Character["class-name"]);
    $("#totalLevel").val(Character["total-level"]);
    $("#profBonus").val(Character["prof-bonus"]);
}

function DisplayScores(Character, allAbilities) {
    allAbilities.forEach(function(ability) {
        $("#" + ability.profName).val(Character[ability.elementName]);
    });
}

function DisplayAbilityMods(Character, allAbilities) {
    allAbilities.forEach(function(ability) {
        $("#mod" + ability.elementName).val(DeriveAbilityModifier(Character[ability.elementName]));
    });
}

function DisplayProfs(proficiencyList, characterProfs){
    proficiencyList.forEach(function(proficiency) {
        $("#prof" + proficiency.elementName).prop('checked', CheckProfs(characterProfs, proficiency.profName));
    });
}

function DisplayExpertise(proficiencyList, characterProfs) {
    proficiencyList.forEach(function(proficiency) {
        $("#exp" + proficiency.elementName).prop('checked', CheckProfs(characterProfs, proficiency.profName));
    });
}

function DisplaySavingBonuses(saveProfsList) {
    saveProfsList.forEach(function(prof) {
        let name = prof.elementName;
        if ($("#prof" + name).is(':checked')) {
            $("#save" + name).val(parseInt($("#mod" + name).val()) + parseInt($("#profBonus").val()));
        }
        else {
            $("#save" + name).val($("#mod" + name).val());
        }
    })
}

function DisplaySkillBonuses(skillList) {
    skillList.forEach(function(skill) {
        let name = skill.elementName;
        let ability = skill.ability;
        if ($("#prof" + name).is(":checked") && $("#exp" + name).is(":checked")) {
            $("#mod" + name).val(parseInt($("#mod" + ability).val()) + (parseInt($("#profBonus").val()) * 2));
        }
        else if ($("#prof" + name).is(":checked")) {
            $("#mod" + name).val(parseInt($("#mod" + ability).val()) + parseInt($("#profBonus").val()));
        }
        else {
            $("#mod" + name).val(parseInt($("#mod" + ability).val()));
        }
    })
}

function AbilityCheck(id) {
    let abilityMod = parseInt($("#mod" + id).val());
    $("#rollBonus").val(abilityMod);
    $("#rollType").val(id + " Ability Check");
}

function SavingThrow(id) {
    let savingBonus = parseInt($("#save" + id).val());
    $("#rollBonus").val(savingBonus);
    $("#rollType").val(id + " Saving Throw")
}
function SkillThrow(id) {
    let skillBonus = parseInt($("#mod" + id).val());
    $("#rollBonus").val(skillBonus);
    $("#rollType").val(id + " Skill Throw");
}