// JavaScript source code



var gameboard = "<table>";
for (let i_rowloop = 0; i_rowloop < tileMap01.height; i_rowloop++)
{
    gameboard += "<tr>";
    for (let i_dataloop = 0; i_dataloop < tileMap01.width; i_dataloop++)
    {
        gameboard += "<td>";

        gameboard += tileMap01.mapGrid[i_rowloop][i_dataloop];

        gameboard += "</td>";
    }

    gameboard += "</tr>";
}

gameboard += "</table>";
document.getElementById("right").innerHTML = gameboard;
//document.getElementById("right").replaceWith(gameboard);
console.log(gameboard);

