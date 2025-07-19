import {variables} from "./variables.js"

export class Map {
    constructor(game) {
        this.game = game;
        this.width = 80;
        this.height = 70;
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 3, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.addBoxes();
        this.createTilesContainer();
    }

    findEmptySpaces() {
        let emptySpaces = [];
        this.map.forEach((element, y) => {
            for (let x = 0; x < element.length; x++) {
                if (element[x] === 0) {
                    emptySpaces.push({ x, y });
                }
            }
        });
        return emptySpaces
    }

    addBoxes() {
        let emptySpaces = this.findEmptySpaces()
        for (let i = 0; i < 50; i++) {
            let pos = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
            if (pos) {
                this.map[pos.y][pos.x] = 2;
            }
        }
    }

    createTilesContainer() {
        if (!variables.tilesContainer) {
            variables.tilesContainer = document.createElement('div');
            variables.tilesContainer.style.position = "absolute";
            variables.tilesContainer.style.top = "0";
            variables.tilesContainer.style.left = "0";
            variables.tilesContainer.style.width = `${this.map[0].length * variables.GRID_CELL_SIZE}px`;
            variables.tilesContainer.style.height = `${this.map.length * variables.GRID_CELL_SIZE}px`;
            variables.tilesContainer.style.zIndex = "1";
            variables.bord.appendChild(variables.tilesContainer);
        }
    }

    draw() {
        // Setup board
        variables.bord.style.position = "relative";
        variables.bord.style.width = `${this.map[0].length * variables.GRID_CELL_SIZE}px`;
        variables.bord.style.height = `${this.map.length * variables.GRID_CELL_SIZE}px`;
        variables.bord.style.border = "2px solid #333";

        // Clear only tiles container
        if (variables.tilesContainer) {
            variables.tilesContainer.innerHTML = "";
        }

        // Draw tiles
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const tile = document.createElement('div');
                tile.style.position = "absolute";
                tile.style.left = `${x * variables.GRID_CELL_SIZE}px`;
                tile.style.top = `${y * variables.GRID_CELL_SIZE}px`;
                tile.style.width = `${variables.GRID_CELL_SIZE}px`;
                tile.style.height = `${variables.GRID_CELL_SIZE}px`;
                tile.style.backgroundSize = "cover";

                if (this.map[y][x] === 1) {
                    tile.style.backgroundImage = "url('./img/block.png')";
                }
                if (this.map[y][x] === 2) {
                    tile.style.backgroundImage = "url('./img/RTS.png')";
                }
                if (this.map[y][x] === 0 || this.map[y][x] === 3) {
                    tile.style.backgroundImage = "url('./img/grass.png')";
                }
                if (this.map[y][x] === 4) {
                    tile.style.backgroundImage = "url('./img/energy.gif')";
                }
                if (this.map[y][x] === 5) {
                    tile.style.backgroundImage = "url('./img/heart.gif')";
                }
                if (this.map[y][x] === 6) {
                    tile.style.backgroundImage = "url('./img/poison.gif')";
                }

                variables.tilesContainer.appendChild(tile);
            }
        }
    }
}
