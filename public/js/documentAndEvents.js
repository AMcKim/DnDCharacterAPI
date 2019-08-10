$(document).ready(function () {

//create <option> tag with character name and add it to dropdown box
const DisplayCharacters = (data)=>{

    data.forEach(element => {
        $("#chooseCharacter").append('<option id="' + element['_id'] + '">' + element['name'] + '</option>');
    }); 
}

const GetCharacters = ()=>{
fetch('/getCharacters', {method : "get"}).then((Response) => {
    return Response.json();
}).then((data)=>{
    DisplayCharacters(data);
});
}

GetCharacters();

//Todo: Write clear form function
//const clearForm = ()=> {
//    characterForm.val('');
//}

//click event for "Get Character" button
$("#btnSelectCharacter").click(function() {
    let id = $("#chooseCharacter").find("option:selected").attr("id");
    ClearDTwenty();
    GetStats(id);
    //$("#characterForm").show();
});

//click event for ability checks
$(".ablCheck").click(function(e) {

    let id = $(this).closest('tr').attr('id');
    AbilityCheck(id);

    $('.tabs #dice').show().siblings().hide();
    $('.tabs #dice').parent('li').addClass('active').siblings().removeClass('active');

    e.preventDefault();
});

//click event for saving throws
$(".ablSave").click(function(e) {

    let id = $(this).closest('tr').attr('id');
    SavingThrow(id);

    $('.tabs #dice').show().siblings().hide();
    $('.tabs #dice').parent('li').addClass('active').siblings().removeClass('active');

    e.preventDefault();
});

//click event for skill checks
$(".skill").click(function(e) {
    
    SkillThrow(this.id);

    $('.tabs #dice').show().siblings().hide();
    $('#dice').parent('li').addClass('active').siblings().removeClass('active');

    e.preventDefault();   
});

//click event for choosing a weapon
$("#btnSelectWeapon").click(function() {
    var name = $("#chooseWeapon").find("option:selected").attr("id");
    GetWeapon(name);
    //$("#weaponForm").show();
});

// click event to attack with chosen weapon
$("#btnWeaponAttack").click(function(e) {
    //RollAttack(GetWeaponAttackBonus());
    //instead
    //Get weapon attack bonus and pass to dice roller
    //open dice roller
    WeaponAttack();

    $('.tabs #dice').show().siblings().hide();
    $("#dice").parent('li').addClass('active').siblings().removeClass('active');

    e.preventDefault();
});

$("#btnRollDTwenty").click(function() {
    RollDTwenty();
});

$("#btnClearDTwenty").click(function() {
    ClearDTwenty();
});

//click event to show/hide tabs
$('.tabs .tab-links a').on('click', function(e) {
    var currentAttrValue = $(this).attr('href');

    $('.tabs ' + currentAttrValue).show().siblings().hide();

    $(this).parent('li').addClass('active').siblings().removeClass('active');

    e.preventDefault();
});

});//end of (document).ready function

