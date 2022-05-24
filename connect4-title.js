var counter = 0;
function rb() {
    var color = "";
    var chooseColor = counter;
    switch (chooseColor) {
        case 0:
            color = "blue";
            break;
        case 1:
            color = "red";
            break;
        case 2:
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
let charArr = Array.from(letters);
var changeColors = setInterval(function () {
    for (let i = 0; i < charArr.length; i++) {
        charArr[i].style.color = rb();
        counter++;
        if (counter > 8) {
            counter = 0;
        }
    }
    setTimeout(function () {
        clearInterval(changeColors);
        counter = 0;
        for (let i = 0; i < charArr.length; i++) {
            charArr[i].style.color = rb();
            counter++;
            if (counter > 7) {
                counter = 0;
            }
        }
    }, 10000);
}, 250);