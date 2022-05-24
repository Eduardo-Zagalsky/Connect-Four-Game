var counter = 0;
function rb() {
    var color = "";
    var chooseColor = counter;
    switch (chooseColor) {
        case 0:
            color = "red";
            break;
        case 1:
            color = "blue";
            break;
        case 3:
            color = "red";
            break;
        case 4:
            color = "blue";
            break;
        case 5:
            color = "red";
            break;
        case 6:
            color = "blue";
            break;
    }
    return color;
}

let letters = document.querySelectorAll("span");
var changeColors = setInterval(function () {
    for (let i = 0; i < letters.length; i++) {
        letters[i].style.color = rb();
        counter++;
        if (counter > 6) {
            counter = 0;
        }
    }
    setTimeout(function () {
        clearInterval(changeColors);
        counter = 0;
    }, 10000);
}, 500);