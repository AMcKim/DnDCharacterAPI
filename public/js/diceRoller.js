function RollDTwenty() {
    let roll1 = "";
    let roll2 = "";
    let result = 0;
    let final = 0;

    let bonus = parseInt($("#rollBonus").val())  ;

    if ($("#neither").is(":checked")) {
        result = Math.floor(Math.random() * 20) + 1;
    }
    else if ($("#advantage").is(":checked")) {
        roll1 = Math.floor(Math.random() * 20) + 1;
        roll2 = Math.floor(Math.random() * 20) + 1;
        if (roll1 >= roll2) {
            result = roll1;
        }
        else if (roll1 < roll2) {
            result = roll2;
        }
    }   
    else if ($("#disadvantage").is(":checked")) {
        roll1 = Math.floor(Math.random() * 20) + 1;
        roll2 = Math.floor(Math.random() * 20) + 1;
        if (roll1 <= roll2) {
            result = roll1;
        }
        else if (roll1 > roll2) {
            result = roll2;
        }
    }
    final = result + bonus;
    $("#roll1").val(roll1.toString());
    $("#roll2").val(roll2.toString());
    $("#rollUsed").val(result.toString());
    $("#final").val(result + " + " + bonus + " = " + final);
}

function ClearDTwenty() {
    $("#rollBonus").val("");
    $("#rollType").val("");
    $("#roll1").val("");
    $("#roll2").val("");
    $("#rollUsed").val("");
    $("#final").val("");
}