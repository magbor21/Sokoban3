/*   This is the base file for the Sokoban assignment - include this one in your HTML page, before you add the main script file*/

/*   Enum of CSS Classes for the static elements   */
var Tiles = {
  Wall: "tile-wall",
  Space: "tile-space",
  Goal: "tile-goal",
};

/*   Enum of CSS Classes for the moving elements   */
var Entities = {
  Character: "entity-player",
  Block: "entity-block",
  BlockDone: "entity-block-goal",
};

/*  Legend
    W = Wall
    B = Movable block
    P = Player starting position
    G = Goal area for the blocks
*/

/* New Tilemap class for easy management */
class TileMap {

    constructor(width, height, mapGrid) {
         this.width = width;
         this.height = height;
         this.mapGrid = mapGrid;
    }

}

/* Tilemap collection class */
class TileMaps {
    constructor() {
        this.tilemaps = [];
    }

    addMap(map) {
        this.tilemaps.push(map);
    }

    get numberOfMaps() {
        return this.tilemaps.length;
    }

    Map(number) {
        if (number > 0 && number <= this.tilemaps.length) {
            let width = this.tilemaps[number - 1].width;
            let height = this.tilemaps[number - 1].height;
            let newArray = Array.from(Array(height), () => new Array(width));  //[this.tilemaps[number-1].width, this.tilemaps[number].height];

            for (let i = 0; i < height; i++)
            for (let j = 0; j < width; j++)
                {
                    newArray[i][j] = this.tilemaps[number - 1].mapGrid[i][j];
                }


            return new TileMap(width, height, newArray);
        }
    }

}


