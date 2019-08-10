var $ = function(id) {
    return document.getElementById(id);
};
window.onload = function () {
    $("rollAttack").onclick=rollAttack;
    $("clearAttack").onclick=clearAttack;
    $("rollDamage").onclick=rollDamage;
    $("clearDamage").onclick=clearDamage;
};
function rollAttack() {
    var roll1 = "";
    var roll2 = "";
    var result = "";
    if ($("neither").checked) {
        result = Math.floor(Math.random() * 20) + 1;
    }
    else if ($("advantage").checked) {
        roll1 = Math.floor(Math.random() * 20) + 1;
        roll2 = Math.floor(Math.random() * 20) + 1;
        if (roll1 >= roll2) {
            result = roll1;
        }
        else if (roll1 < roll2) {
            result = roll2;
        }
    }   
    else if ($("disadvantage").checked) {
        roll1 = Math.floor(Math.random() * 20) + 1;
        roll2 = Math.floor(Math.random() * 20) + 1;
        if (roll1 <= roll2) {
            result = roll1;
        }
        else if (roll1 > roll2) {
            result = roll2;
        }
    }
    $("roll1").value = roll1.toString();
    $("roll2").value = roll2.toString();
    $("finalRoll").value = result.toString();
}
function clearAttack() {
    $("attackForm").reset();
}
function rollDamage() {
    var numberOfDice = "";
    var maxRoll = "";
    var roll = "";
    var totalDamage = 0;
    var rollText = "";
    
    numberOfDice = $("dice").value;
    maxRoll = $("type").value;
    
    for (var counter = 1; counter <= numberOfDice; counter ++) {
        roll = Math.floor(Math.random() * maxRoll) +1;
        totalDamage += roll;
        rollText =  rollText + "Roll " + counter.toString() + " = " + 
                roll.toString() + "<br />";
    }
    
    rollText = rollText + "Total Damage = " +
            totalDamage.toString();
    $("totals").innerHTML = rollText;
}
function clearDamage() {
    $("totals").innerHTML = "";
}