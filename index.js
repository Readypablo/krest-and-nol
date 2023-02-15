// коолекция всех элементов
let items = document.getElementsByClassName("app_block");

// ход игрока
let movePlayer = true;
// состояние самой игры
let game = true;






// проверяем все эелементы на клике
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", function() {

        let collecion = document.querySelectorAll(".app_block:not(.active)");
        // проверяем поле на ничью
        if (collecion.length == 1) {
            exit({ win: "other" });
        }
        // проверяем что внутри ячейки
        if (!this.classList.contains("active")) {
            //    xod igroka
            if (movePlayer) {

                //  смотрим свободна ли ячейка
                if (this.innerHTML == "") {

                    this.classList.add("active");
                    this.classList.add("active_x");
                    this.innerHTML = "x";


                }

                let result = checkMap();
                if (result.val) {
                    game = false;
                    setTimeout(function() {
                        exit(result);
                    }, 10);
                }
                movePlayer = !movePlayer;
            }

            //ходтба бота 100 = время его раздумий
            if (game) {
                setTimeout(function() {
                    botMove();
                }, 100);
            }
        }
    });
}


//  функция Хода бота
function botMove() {
    let items = document.querySelectorAll(".app_block:not(.active)");

    let step = getRandomInt(items.length);
    items[step].innerHTML = "о";
    items[step].classList.add("active");
    items[step].classList.add("active_0");

    let result = checkMap();
    if (result.val) {
        setTimeout(function() {
            exit(result);
        }, 1);
    }
    movePlayer = !movePlayer;

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//проверка ячеек 
function checkMap() {
    let block = document.querySelectorAll(".app_block");
    let items = [];
    for (let i = 0; i < block.length; i++) {
        items.push(block[i].innerHTML);
    }
    //проверяем ячейки на предметы совпадения
    if (items[0] == "x" && items[1] == 'x' && items[2] == 'x' ||
        items[3] == "x" && items[4] == 'x' && items[5] == 'x' ||
        items[6] == "x" && items[7] == 'x' && items[8] == 'x' ||
        items[0] == "x" && items[3] == 'x' && items[6] == 'x' ||
        items[1] == "x" && items[4] == 'x' && items[7] == 'x' ||
        items[2] == "x" && items[5] == 'x' && items[8] == 'x' ||
        items[0] == "x" && items[4] == 'x' && items[8] == 'x' ||
        items[6] == "x" && items[4] == 'x' && items[2] == 'x')
        return { val: true, win: "player" }
    if (items[0] == "о" && items[1] == 'о' && items[2] == 'о' ||
        items[3] == "о" && items[4] == 'о' && items[5] == 'о' ||
        items[6] == "о" && items[7] == 'о' && items[8] == 'о' ||
        items[0] == "о" && items[3] == 'о' && items[6] == 'о' ||
        items[1] == "о" && items[4] == 'о' && items[7] == 'о' ||
        items[2] == "о" && items[5] == 'о' && items[8] == 'о' ||
        items[0] == "о" && items[4] == 'о' && items[8] == 'о' ||
        items[6] == "о" && items[4] == 'о' && items[2] == 'о')
        return { val: true, win: "bot" }

    return { val: false }

}

// pobeda
let cat1 = document.getElementById("cat-flex1");
let cat2 = document.getElementById("cat-flex2");
// lose
let lox1 = document.getElementById("lox-flex1");
let lox2 = document.getElementById("lox-flex2");
//ничья
let other1 = document.getElementById("other-flex1");
let other2 = document.getElementById("other-flex2");
//text 
let pobeda = document.getElementById("win-text");
let proig = document.getElementById("lose-text");
let nich = document.getElementById("other-text");
//button restart
let nextGame = document.getElementById("btn-restart2");

//завершение игры
function exit(obj) {

    if (obj.win == "other") {
        nich.style.display = "block";
        nextGame.style.display = "block";
        other1.style.display = "block";
        other2.style.display = "block";
    }


    if (obj.win == "player") {
        cat1.style.display = "block";
        cat2.style.display = "block";
        pobeda.style.display = "block";
        nextGame.style.display = "block";
        nich.style.display = "none";
        other1.style.display = "none";
        other2.style.display = "none";
    }

    if (obj.win == "bot") {
        proig.style.display = "block";
        nextGame.style.display = "block";
        nich.style.display = "none";
        lox1.style.display = "block";
        lox2.style.display = "block";
        other1.style.display = "none";
        other2.style.display = "none";
    }




}

function restart() {
    nextGame.style.display = "none";
    location.reload();
}