//import { checkServerIdentity } from "tls";

var Weapon = {};

const DisplayCharacterWeapons = (data)=>{

    $("#chooseWeapon").empty();
    data.forEach(element => {
        $("#chooseWeapon").append('<option id="' + element[0] + '">' + element[0] + '</option>');
    }); 
}

const GetWeapon = (name) => {
    fetch('/getWeapons/' + name, {method : "get"}).then((Response) => {
        return Response.json();
    }).then((weaponStats)=> {
        WeaponGetSuccess(weaponStats);
    }).then((weaponStats)=> {
        DisplayWeaponInfo(Weapon);
    });
}

function WeaponGetSuccess(stats) {
    Weapon = stats;
}

function DisplayWeaponInfo(Weapon) {
    $("#chosenWeapon").val(Weapon["name"]);
    //$("#quantity").val(Character[]);
    $("#weaponType").val(Weapon["weaponType"]);
    $("#weaponDamage").val(Weapon["damage"]);
    $('#damageType').val(Weapon["damageType"]);
    $('#weaponProps').val(Weapon["weaponProperties"]);
    $('#weaponRange').val(Weapon["range"]);

    $("#profWeapon").prop('checked', CheckWeaponProf(Character["weapon-profs"], Weapon));

    //get attack bonus, pass in abilityMod, profBonus, weaponBonus
    $("#weaponAttackBonus").val(DeriveAttackBonus(DeriveWeaponAbilityMod(Weapon.class, Weapon.weaponProperties), DeriveWeaponProfBonus(), DeriveWeaponBonus(Weapon)));
}

//funtion getWeaponQuantity() {

//}

function CheckWeaponProf(characterProfs, Weapon) {
    if(CheckProfs(characterProfs, Weapon["name"].toLowerCase()) || CheckProfs(characterProfs, Weapon["category"].toLowerCase()))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function DeriveAttackBonus(abilityMod, profBonus, weaponBonus) {
    let attackBonus = 0;

    attackBonus = abilityMod + profBonus + weaponBonus;

    return attackBonus;
}

function DeriveWeaponAbilityMod(weaponClass, weaponProperties) {
    let abilityMod = 0;
    if (weaponClass === "ranged" || weaponProperties.includes("finesse")) {
        abilityMod = parseInt($("#modDex").val());
    }
    else {
        abilityMod = parseInt($("#modStr").val());
    }
    return abilityMod;
}

function DeriveWeaponProfBonus() {
    let weaponProf = 0;
    if ($("#profWeapon").is(":checked")) {
        weaponProf = parseInt($("#profBonus").val());
    }
    else {
        weaponProf = 0;
    }
    return weaponProf;
}

function DeriveWeaponBonus(Weapon) {
    let weaponBonus = 0;
    if (Weapon.hasOwnProperty("attackBonus")) {
        weaponBonus = Weapon.attackBonus.val();
    }
    else {
        weaponBonus = 0;
    }
    return weaponBonus;
}

function WeaponAttack() {
    let weapon = $("#chosenWeapon").val().toString();
    let attackBonus = parseInt($("#weaponAttackBonus").val());
    $("#rollBonus").val(attackBonus);
    $("#rollType").val(weapon + " Attack");
}