// JavaScript source code

class Positions{ // I used positions in several places so I created a class for them.
    constructor(pos_X, pos_Y) {
        this.pos_X = pos_X;
        this.pos_Y = pos_Y;
    }

}
var Player = new Positions(0, 0); //Position of player is read from the gameboard in UpdateBoard();
var tileMap01; // The gameboard
var currentLevel = 1; //What level is playing
var selectedLevel = currentLevel; //Which level is showing on the left side

ResetBoard(); // fetches a new board
UpdateBoard(); // Updates the right hand side
UpdateMenu(); // Updates the left side

document.addEventListener("keydown", KeyPressed); // Listens for keypresses in the whole document

// Now the games can begin...

function KeyPressed(key) {
    
    switch (key.key) {

        case "ArrowUp": // WASD is also available for pro gamers
        case "W":
        case "w":
            CanMove("up"); // checks if the player can move and moves both player and boxes
            break;
        case "ArrowLeft":
        case "A":
        case "a":
            CanMove("left");
            break;
        case "ArrowDown":
        case "S":
        case "s":
            CanMove("down");
            break;
        case "ArrowRight":
        case "D":
        case "d":
            CanMove("right");
            break;
        case "r":
        case "R":
            ResetBoard(); // R resets the board by getting a new copy of the board from the TileMapArray (in levels.js)
            break;
        case "PageUp":
            currentLevel = (Math.min(currentLevel + 1, tileMapArray.numberOfMaps)); // for switching levels with keyboard
            ResetBoard();
            break;
        case "PageDown":
            currentLevel = (Math.max(currentLevel - 1, 1));
            ResetBoard();
            break;


        default:
            // don't do anything
            break;
    }
        UpdateBoard(); // Updates the board in case something moved.
    return;
}

function CanMove(direction) {
    
    let oneStep = new Positions(Player.pos_X, Player.pos_Y); // sets Players coordinates as start values
    let twoStep = new Positions(Player.pos_X, Player.pos_Y); // just in case...

    switch (direction) { // Creates two steps in the desired direction for easier calculations.
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

    if (tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] == "W") // If Player tries to walk on walls or Outside
        return false;
    if (tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] == ".") //Just skip the next bit
        return false;


    if (tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] == "B") // Move a box?
    {
        
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
            return false; // Could not move the box
    }

    if (tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] == "D") // Move a box in goal area
    {
      
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
            return false; // Could not move the box
    }

    // Time to move the player
    
    if (tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] == " ") //move to floor space
        tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] = "P";
    else if (tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] == "G") // move to goal space
        tileMap01.mapGrid[oneStep.pos_X][oneStep.pos_Y] = "O";
    else
        return false; 

    // And remove the old player position
    if (tileMap01.mapGrid[Player.pos_X][Player.pos_Y] == "P") //move from floor space
        tileMap01.mapGrid[Player.pos_X][Player.pos_Y] = " ";
    else if (tileMap01.mapGrid[Player.pos_X][Player.pos_Y] == "O") // move from goal space
        tileMap01.mapGrid[Player.pos_X][Player.pos_Y] = "G";
    else
        return false;

    return true; // All is well. Returning
}


function UpdateMenu() { // The left side, with the buttons and the preview.

    let leftData = "";

    leftData += "<h2>Select level</h2>\n";
    leftData += "<h4>CURRENT LEVEL " + currentLevel + "</h4>\n";
    leftData += "<div id=\"buttons\">\n";
    leftData += "<input type=\"button\" id=\"leveldown\" value=\"<--\" onclick=\"ChangeSelected(selectedLevel -1)\">\n"; // Left arrowed button 
    leftData += "<input type=\"number\" id=\"levelnumber\" name=\"levelnumber\" min=\"1\" max=\"" + tileMapArray.numberOfMaps + "\" step=\"1\" value = \"" + selectedLevel + "\" onchange=\"ChangeSelected(this.value)\">"; // Number selector in top middle
    leftData += "<input type=\"button\" id=\"levelup\" value=\"-->\" onclick=\"ChangeSelected(parseInt(selectedLevel) +1)\">"; // Right arrow button
    leftData += "<input type=\"range\" id=\"slider\" name=\"slider\" min=\"1\" max=\"" + tileMapArray.numberOfMaps + "\" step=\"1\" value = \"" + selectedLevel + "\" onchange=\"ChangeSelected(this.value)\">\n"; // A (slider) for fun
    leftData += "<input type=\"button\" id=\"start\" value=\"START LEVEL\" onclick=\"StartBoard()\">"; // Play selected level
    leftData += "<input type=\"button\" id=\"reset\" value=\"Reset \ncurrent \nlevel\" onclick=\"ResetBoard()\">"; // Reset the current game on the right side

    leftData += "</div>\n"; // The preview window. A mini version of the Game Board using background color for tiles

    leftData += "<div id=\"preview\">\n";
    for (let i_rowloop = 0; i_rowloop < tileMapArray.tilemaps[selectedLevel-1].height; i_rowloop++) {
        leftData += "<ol class = \"preview_rows\">";
        for (let i_dataloop = 0; i_dataloop < tileMapArray.tilemaps[selectedLevel - 1].width; i_dataloop++) {
            
            let currentTile = tileMapArray.tilemaps[selectedLevel - 1].mapGrid[i_rowloop][i_dataloop].toString();

            if (currentTile == " ") //CSS doesn't like classes called ". " and ".."
                currentTile = "X";
            if (currentTile == ".")
                currentTile = "Y";



            leftData += "<li class = \"" + currentTile + "\"> </li>\n"; // Sets the mapTile letter as class name for easy formatting later.

        }
        leftData += "</ol>\n";
    }

    
    leftData += "</div>\n";

    document.getElementById("left").innerHTML = leftData; // Adds all the HTML to the left side
}


function UpdateBoard() { // Updates the right hand side
    let gameboard = ""; 
    let boxes = 0; // Boxes - Goals = Victory
    let goals = 0;
    let players = 0; // Checks for Extra or missing players

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
                    gameboard += "<img src=\"Tiles\\stone_bricks.png\" class=\"tile\">"; // Uses class to separate tiles from entites
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
                    
                    players++;
                
                    break;

                case "O":
                    /* player On goal tile*/
                    gameboard += Tiles.Space + "\">";
                    gameboard += "<img src=\"Tiles\\barrel_top_open.png\" class=\"tile\">";
                    gameboard += "<img src=\"Tiles\\monkey2.png\" class=\"entity\" alt=\"";
                    Player.pos_Y = i_dataloop;
                    Player.pos_X = i_rowloop;
                    
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
            gameboard += currentTile + "\">"; 

            gameboard += "</li>";
        }

        gameboard += "</ol>\n";
    }

    if (goals != boxes)
        console.log("Error! Too many or too few boxes ");
    if (players != 1)
        console.log("Error! Too many or too few players! ");
    if (goals == 0) {
        console.log("Victory!");
        alert("VICTORY!");
    }
       
    document.getElementById("arena").innerHTML = gameboard; // Adds the HTML to the Arena part of the right hand side

}

function ResetBoard() { //Gets a new copy of the gameboard
    tileMap01 = tileMapArray.Map(currentLevel); 
    UpdateBoard(); // and starts a new game
    UpdateMenu();
}

function StartBoard() { // Starts the selected level fron the left hand side
    currentLevel = selectedLevel;
    ResetBoard();
    UpdateBoard();
    UpdateMenu();
}

function ChangeSelected(value) { // Updates the preview window
    if (value <= tileMapArray.numberOfMaps && value >= 1)
        selectedLevel = value;
    
    UpdateMenu();

}
