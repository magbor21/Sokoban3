// JavaScript source code

class Positions{
    constructor(pos_X, pos_Y) {
        this.pos_X = pos_X;
        this.pos_Y = pos_Y;
    }

}
var Player = new Positions(0, 0);
var tileMap01 = new TileMaps(16, 16, [[".", ".", "W", "W", "W", "W", ".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
[".", ".", "W", " ", " ", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
[".", ".", "W", " ", " ", " ", " ", "B", " ", " ", " ", "B", " ", "B", " ", "W"],
[".", ".", "W", " ", "B", "W", " ", "B", " ", "W", " ", " ", "B", " ", " ", "W"],
[".", ".", "W", " ", " ", "B", " ", "B", " ", " ", "W", " ", " ", " ", " ", "W"],
["W", "W", "W", " ", "B", "W", " ", "W", " ", " ", "W", "W", "W", "W", " ", "W"],
["W", "P", "W", "B", " ", "B", " ", "B", " ", " ", "W", "W", " ", " ", " ", "W"],
["W", " ", " ", " ", " ", "B", " ", "W", "B", "W", " ", " ", " ", "W", " ", "W"],
["W", " ", " ", " ", "B", " ", " ", " ", " ", "B", " ", "B", " ", "B", " ", "W"],
["W", "W", "W", "W", "W", " ", " ", "W", "W", "W", "W", "W", "W", "W", "W", "W"],
[".", ".", "W", " ", " ", " ", " ", " ", " ", "W", ".", ".", ".", ".", ".", "."],
[".", ".", "W", " ", " ", " ", " ", " ", " ", "W", ".", ".", ".", ".", ".", "."],
[".", ".", "W", "G", "G", "G", "G", "G", "G", "W", ".", ".", ".", ".", ".", "."],
[".", ".", "W", "G", "G", "G", "G", "G", "G", "W", ".", ".", ".", ".", ".", "."],
[".", ".", "W", "G", "G", "G", "G", "G", "G", "W", ".", ".", ".", ".", ".", "."],
[".", ".", "W", "W", "W", "W", "W", "W", "W", "W", ".", ".", ".", ".", ".", "."]]);


var tileMapArray = [];

UpdateBoard(); /* ska bort sen*/
//ImportLevels(); 

document.addEventListener("keydown", KeyPressed);


var onFilePicked = function (event) {
    var input = event.target;
    var reader = new FileReader();
    console.log(input.files[0]);

    reader.onload = function (theFile) {
        var texten = theFile.target.result;
        console.log(texten);
    }
    reader.readAsText(input.files[0]);
};


function KeyPressed(key) {
    let couldMove = false;
    console.log(key.key);
    
    switch (key.key) {

        case "ArrowUp":
        case "W":
        case "w":
            couldMove = CanMove("up");
            break;
        case "ArrowLeft":
        case "A":
        case "a":
            couldMove = CanMove("left");
            break;
        case "ArrowDown":
        case "S":
        case "s":
            couldMove = CanMove("down");
            break;
        case "ArrowRight":
        case "D":
        case "d":
            couldMove = CanMove("right");
            break;
        default:
            couldMove = false;
    }
        UpdateBoard();
    return;
}

function CanMove(direction) {
    console.log("Can I move?");
    let oneStep = new Positions(Player.pos_X, Player.pos_Y); // sets Players coordinates as start values
    let twoStep = new Positions(Player.pos_X, Player.pos_Y); // just in case...

    switch (direction) {
        case "left": //left
            oneStep.pos_Y = Player.pos_Y - 1;
            twoStep.pos_Y = oneStep.pos_Y - 1;
            break;
        case "up": //left
            oneStep.pos_X = Player.pos_X - 1;
            twoStep.pos_X = oneStep.pos_X - 1;
            break;
        case "right": // down
            oneStep.pos_Y = Player.pos_Y + 1;
            twoStep.pos_Y = oneStep.pos_Y + 1;
            break;
        case "down": // right
            oneStep.pos_X = Player.pos_X + 1;
            twoStep.pos_X = oneStep.pos_X + 1;
            break;
        default:
            console.log("wrong direction?");
            return false;
    }
    console.log(Player.pos_X + " " + Player.pos_Y);
    console.log(oneStep.pos_X + " " + oneStep.pos_Y);
    console.log(twoStep.pos_X + " " + twoStep.pos_Y);

    if (tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] == "W") // If Player tries to walk on walls or Outside
        return false;
    if (tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] == ".") //Just skip the next bit
        return false;


    if (tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] == "B") // Move a box?
    {
        console.log("box")
        if (tileMap01.mapGrid[twoStep.pos_X][twoStep.pos_Y] == "G") // To a goal area
        {
            tileMap01.mapGrid[twoStep.pos_X][twoStep.pos_Y] = "D";
            tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] = " ";
        }
        else if (tileMap01.mapGrid[twoStep.pos_X][twoStep.pos_Y] == " ") // To blank space
        {
            tileMap01.mapGrid[twoStep.pos_X][twoStep.pos_Y] = "B";
            tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] = " ";
        }
        else
            return false;
    }

    if (tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] == "D") // Move a box in goal area
    {
        console.log("goalbox");
        if (tileMap01.mapGrid[twoStep.pos_X][twoStep.pos_Y] == "G") // Within goal area
        {
            tileMap01.mapGrid[twoStep.pos_X][twoStep.pos_Y] = "D";
            tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] = "G";
        }
        else if (tileMap01.mapGrid[twoStep.pos_X][twoStep.pos_Y] == " ") // Out of goal area
        {
            tileMap01.mapGrid[twoStep.pos_X][twoStep.pos_Y] = "B";
            tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] = "G";
        }
        else
            return false;
    }

    // Time to move the player
    console.log("move player")
    if (tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] == " ") //move to floor space
        tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] = "P";
    else if (tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] == "G") // move to goal space
        tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] = "O";
    else
        return false;

    console.log("remove old persinb")
    if (tileMap01.mapGrid[Player.pos_X][Player.pos_Y] == "P") //move from floor space
        tileMap01.mapGrid[Player.pos_X][Player.pos_Y] = " ";
    else if (tileMap01.mapGrid[Player.pos_X][Player.pos_Y] == "O") // move from goal space
        tileMap01.mapGrid[Player.pos_X][Player.pos_Y] = "G";
    else
        return false;

    return true; // All is well. Returning
}





function UpdateBoard() {
    console.log("UpdateBoard");
    let gameboard = "";
    let boxes = 0;
    let goals = 0;
    let players = 0;

    for (let i_rowloop = 0; i_rowloop < tileMap01.height; i_rowloop++)
    {
        gameboard += "<ol class = \"rows\">";
        for (let i_dataloop = 0; i_dataloop < tileMap01.width; i_dataloop++)
        {
            gameboard += "<li class = \"";
            let currentTile = tileMap01.mapGrid[i_rowloop][i_dataloop].toString();
            switch (currentTile) {
                case "W": /* Wall */
                    gameboard += Tiles.Wall + "\">";
                    gameboard += "<img src=\"Tiles\\polished_blackstone_bricks.png\" class=\"tile\" alt=\"";
                    break;

                case "B": /* Box */
                    gameboard += Entities.Block + "\">";
                    gameboard += "<img src=\"Tiles\\stone_bricks.png\" class=\"tile\">";
                    gameboard += "<img src=\"Tiles\\observer_back.png\" class=\"entity\" alt=\"";
                    boxes++;

                    break;

                case "G": /* Goal */
                    gameboard += Tiles.Goal + "\">";
                    gameboard += "<img src=\"Tiles\\barrel_top_open.png\" class=\"tile\" alt=\"";;
                    goals++;

                    break;

                case "D": /* Done Tile */
                    gameboard += Entities.BlockDone + "\">";
                    gameboard += "<img src=\"Tiles\\barrel_top_open.png\" class=\"tile\">";
                    gameboard += "<img src=\"Tiles\\observer_back_on.png\" class=\"entity\" alt=\"";
                    
                    
                    break;
        
                case "P":
                    /* Player */
                    gameboard += Tiles.Space + "\">";
                    gameboard += "<img src=\"Tiles\\stone_bricks.png\" class=\"tile\">";
                    gameboard += "<img src=\"Tiles\\monkey2.png\" class=\"entity\" alt=\"";
                    Player.pos_Y = i_dataloop;
                    Player.pos_X = i_rowloop;
                    console.log(i_dataloop + " " + i_rowloop);
                    // console.log(Player.pos_X + " " + Player.pos_Y);
                    players++;
                
                    break;

                case "O":
                    /* player On goal tile*/
                    gameboard += Tiles.Space + "\">";
                    gameboard += "<img src=\"Tiles\\barrel_top_open.png\" class=\"tile\">";
                    gameboard += "<img src=\"Tiles\\monkey2.png\" class=\"entity\" alt=\"";
                    Player.pos_Y = i_dataloop;
                    Player.pos_X = i_rowloop;
                    // console.log(i_dataloop + " " + i_rowloop);
                    players++;
                    goals++;
                    

                    break;

                case ".": /* Outdoors */
                    gameboard += Tiles.Space + "\">";
                    gameboard += "<img src=\"Tiles\\grass_block_topd.png\" alt=\"";
                    break;

                default: /* (floor) */
                    gameboard += Tiles.Space + "\">";
                    gameboard += "<img src=\"Tiles\\stone_bricks.png\" alt=\"";
                    break;
            }
            gameboard += currentTile + "\">"; // fixa sen

            gameboard += "</li>";
        }

        gameboard += "</ol>\n";
    }

    if (goals != boxes)
        console.log("Error! Too many or too few boxes ");
    if (players != 1)
        console.log("Error! Too many or too few players! ");
    if (goals == 0)
        console.log("Victory!");

    document.getElementById("arena").innerHTML = gameboard;
    console.log(Player.pos_X + " " + Player.pos_Y);
    //document.getElementById("right").replaceWith(gameboard);
    //console.log(gameboard);
    //console.log(document.body.height);
}



/*
function ImportLevels() {

    var texten = "";
    //var file = new File([""], "./Original.txt");
    var reader = new FileReader();

    reader.onload = function (theFile) {
        texten = theFile.target.result;
        console.log(texten);
    }

    reader.onloadend = function () {
        console.log('DONE', reader.readyState); // readyState will be 2
        //console.log(reader.result);
    }

    
    reader.readAsText(file);
    console.log(texten);
}
*/

function FileResult(rf) {

    console.log(rf);
}

