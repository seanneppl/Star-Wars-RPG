// try using .hide/.show
//

$(document).ready(function () {

    var header;
    var img;
    var info;

    var obi = {};
    var luke = {};
    var sid = {};
    var maul = {};

    var selectArray = [obi, luke, sid, maul];
    var fighterArray = [];
    var enemyArray = [];
    var opponentArray = [];
    var defeatedArray = [];

    var grow;


    var f = function () {
        header = $("<p></p>").text(this.name);
        img = $("<img>").attr("src", this.img);
        info = $("<p></p>").text(this.health);
        }


    var random = (increment, multiple, min) => ((Math.floor(Math.random() * increment) * multiple) + min);
   

    function initial() {

        obi = {
            name: "Obi-Wan Kenobi", img: "assets/images1.jpg", health: random(5, 10, 100), attack: random(3, 5, 5), counter: random(3, 5, 10), createChar: f
        };
        luke = {
            name: "Luke Skywalker", img: "assets/images2.jpg", health: random(5, 10, 100), attack: random(3, 5, 5), counter: random(3, 5, 10), createChar: f
                
        };
        sid = {
            name: "Darth Sidious", img: "assets/images3.png", health: random(5, 10, 100), attack: random(3, 5, 5), counter: random(3, 5, 10), createChar: f
               
        };
        maul = {
            name: "Darth Maul", img: "assets/images4.jpg", health: random(5, 10, 100), attack: random(3, 5, 5), counter: random(3, 5, 10), createChar: f
              
        };
        selectArray = [obi, luke, sid, maul];

        for (i in selectArray) {
            // selectArray[i].health = random(5, 10, 100);
            console.log("health" + selectArray[i].health)
        }
        for (i in selectArray) {
            // selectArray[i].attack = random(3, 5, 5);
            console.log("attack" + selectArray[i].attack)
        }
        for (i in selectArray) {
            // selectArray[i].counter = random(3, 5, 10);
            console.log("counter" + selectArray[i].counter)
        }

        // obi = {
        //     name: "obi-wan Kenobi", img: "assets/images.png", health: "120", attack: 5, counter: 20, createChar: function () {
        //         header = $("<p></p>").text(this.name);
        //         img = $("<img>").attr("src", this.img);
        //         info = $("<p></p>").text(this.health);
        //         // info = $("<p></p>").text(this.health).val(this.health);
        //     }
        // };
        // luke = {
        //     name: "luke skywalker", img: "assets/images.png", health: "100", attack: 5, counter: 20, createChar: function () {
        //         header = $("<p></p>").text(this.name);
        //         img = $("<img>").attr("src", this.img);
        //         info = $("<p></p>").text(this.health);
        //     }
        // };
        // sid = {
        //     name: "darth sidious", img: "assets/images.png", health: "150", attack: 50, counter: 20, createChar: function () {
        //         header = $("<p></p>").text(this.name);
        //         img = $("<img>").attr("src", this.img);
        //         info = $("<p></p>").text(this.health);
        //     }
        // };
        // maul = {
        //     name: "darth maul", img: "assets/images.png", health: "100", attack: 5, counter: 20, createChar: function () {
        //         header = $("<p></p>").text(this.name);
        //         img = $("<img>").attr("src", this.img);
        //         info = $("<p></p>").text(this.health);
        //     }
        // };

        
        fighterArray = [];
        enemyArray = [];
        opponentArray = [];
        defeatedArray = [];


        $(".restart").addClass("hide");
    }

    initial();


    function draw() {
        $(".div").empty();
        $(".div").addClass('hide');
        $(".message").empty('hide');

        for (var i = 0; i < selectArray.length; i++) {
            selectArray[i].createChar();
            $(".select" + i).append(header, img, info);
            $(".select" + i).removeClass("hide");
        }
        for (var i = 0; i < fighterArray.length; i++) {
            fighterArray[i].createChar();
            $(".fighter" + i).append(header, img, info);
            $(".fighter" + i).removeClass("hide");

        }
        for (var i = 0; i < opponentArray.length; i++) {
            opponentArray[i].createChar();
            $(".opponent" + i).append(header, img, info);
            $(".opponent" + i).removeClass("hide");
        }
        for (var i = 0; i < enemyArray.length; i++) {
            enemyArray[i].createChar();
            $(".enemy" + i).append(header, img, info);
            $(".enemy" + i).removeClass("hide");
        }
    }

    draw();

    $(".select").click(charSelect);

    function charSelect() {
        fighterArray = selectArray.splice($(this).index(".select"), 1);
        enemyArray = selectArray.splice(0);
        $(".select").addClass("hide");
        grow = fighterArray[0].attack;
        draw();
    }

    $(".enemy").click(opponentSelect);

    function opponentSelect() {
        if (opponentArray.length === 0) {
            opponentArray = enemyArray.splice($(this).index(".enemy"), 1);
            $(this).addClass("hide");
            draw();
        }
    }

    $("#attack").click(attack);


    var message1;
    var message2;

    function attack() {
        if (parseInt(fighterArray[0].health) > 0) {
            fighterArray[0].health = parseInt(fighterArray[0].health) - opponentArray[0].counter;
            opponentArray[0].health = parseInt(opponentArray[0].health) - fighterArray[0].attack;

            attackAnimate();

            draw();

            message1 = $("<p></p>").text("You attacked " + opponentArray[0].name + " for " + fighterArray[0].attack + " damage.");
            message2 = $("<p></p>").text(opponentArray[0].name + " attacked you back for " + opponentArray[0].counter + " damage.");
            $(".message").removeClass("hide").append(message1, message2);

            fighterArray[0].attack += grow;
            console.log(fighterArray[0].attack);

            if (parseInt(opponentArray[0].health) <= 0 && fighterArray[0].health > 0) {
                defeatedArray = opponentArray.splice(0);
                draw();
                message1 = $("<p></p>").text("You defeated " + defeatedArray[0].name + ". Select another opponent.");
                $(".message").append(message1);
            }
            if (parseInt(fighterArray[0].health) <= 0) {
                draw();
                message1 = $("<p></p>").text("You have been defeated");
                $(".message").append(message1);
                $(".message").removeClass("hide");
                $(".restart").removeClass("hide");
            }
            if (enemyArray.length === 0 && opponentArray.length === 0) {
                draw();
                message1 = $("<p></p>").text("You won!");
                $(".message").append(message1);
                $(".message").removeClass("hide");
                $(".restart").removeClass("hide");
            }
        }
    }

    var attackAnimate = function(){
        $(".fighter").animate({ left: '5px' }, 100);
        $(".fighter").animate({ left: '-5px' }, 100);
        $(".fighter").animate({ left: '2px' }, 150);
        $(".fighter").animate({ left: '0px' }, "fast");
        $(".opponent").animate({ left: '5px' }, 100);
        $(".opponent").animate({ left: '-5px' }, 100);
        $(".opponent").animate({ left:  "2px" }, 150);
        $(".opponent").animate({ left: "0px" }, "fast");
    }


    $(".restart").click(restart);

    function restart() {
        initial()
        draw();
    }

    // <button class="restart">Restart</button>
    // var button = $("<button></button>").addClass("restart").text("restart");

});