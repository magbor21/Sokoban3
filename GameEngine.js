// JavaScript source code


var Player = {
    pos_X: 0,
    pos_Y: 0
}

var gameboard = "<table cellspacing=\"0\" cellpadding=\"0\">";
for (let i_rowloop = 0; i_rowloop < tileMap01.height; i_rowloop++)
{
    gameboard += "<tr>";
    for (let i_dataloop = 0; i_dataloop < tileMap01.width; i_dataloop++)
    {
        gameboard += "<td class = \"";
        let currentTile = tileMap01.mapGrid[i_rowloop][i_dataloop].toString();
        switch (currentTile) {
            case "W": /* Wall */
                gameboard += Tiles.Wall + "\">";
                gameboard += "<img src=\"Tiles\\polished_blackstone_bricks.png\" alt=\"";
                break;

            case "B": /* Box */
                gameboard += Entities.Block + "\">";
                gameboard += "<img src=\"Tiles\\barrel_top_open.png\" alt=\"";

                break;

            case "G": /* Goal */
                gameboard += Tiles.Goal + "\">";
                gameboard += "<img src=\"Tiles\\polished_blackstone_bricks.png\" alt=\"";

                break;

            case "D": /* Done Tile */
                gameboard += Entities.BlockDone + "\">";
                gameboard += "<img src=\"Tiles\\polished_blackstone_bricks.png\" alt=\"";

                break;
        
            case "P":
                /* Player */
                gameboard += Tiles.Space + "\">";
                gameboard += "<img src=\"Tiles\\stone_bricks.png\" alt=\"";
                Player.pos_X = i_dataloop;
                Player.pos_y = i_rowloop;
                console.log(Player.pos_X + " " + Player.pos_Y);

                break;

            default: /* (floor) */
                gameboard += Tiles.Space + "\">";
                gameboard += "<img src=\"Tiles\\stone_bricks.png\" alt=\"";
                break;
        }
        gameboard += currentTile + "\">";

        gameboard += "</td>";
    }

    gameboard += "</tr>\n";
}

gameboard += "</table>";
document.getElementById("right").innerHTML = gameboard;
//document.getElementById("right").replaceWith(gameboard);
console.log(gameboard);
console.log(document.body.height);

