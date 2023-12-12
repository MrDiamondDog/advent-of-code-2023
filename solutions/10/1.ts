import { getInput } from "../../utils/input";

type Character = "." | "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";

enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST
}

type Pos = {
    x: number;
    y: number;
};

const pipeTypes: { [key in Character]: Direction[] } = {
    ".": [],
    "|": [Direction.NORTH, Direction.SOUTH],
    "-": [Direction.WEST, Direction.EAST],
    "L": [Direction.NORTH, Direction.EAST],
    "J": [Direction.NORTH, Direction.WEST],
    "7": [Direction.WEST, Direction.SOUTH],
    "F": [Direction.SOUTH, Direction.EAST],
    "S": [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST]
};

const input = getInput(10);
const grid = input.split("\n");

function pos(pos: Pos): Character {
    return grid[pos.y][pos.x] as Character;
}

function getNeighbors(x: number, y: number): (Pos & { char: Character; })[] {
    const out: (Pos & { char: Character; })[] = [];

    if (x > 0) out.push({ x: x - 1, y, char: pos(x - 1, y) });
    if (x < grid[y].length) out.push({ x: x + 1, y, char: pos(x + 1, y) });
    if (y > 0) out.push({ x, y: y - 1, char: pos(x, y - 1) });
    if (y < grid.length) out.push({ x, y: y + 1, char: pos(x, y + 1) });

    return out;
}

function getDirs(char: Character): Direction[] {
    return pipeTypes[char];
}

function oppositeDir(dir: Direction): Direction {
    if (dir == Direction.NORTH) return Direction.SOUTH;
    if (dir == Direction.SOUTH) return Direction.NORTH;
    if (dir == Direction.EAST) return Direction.WEST;
    else return Direction.EAST;
}

function isConnected(original: Pos, other: Pos) {
    const ogChar = pos(original);
    const otherChar = pos(other);

    if (otherChar == ".") return false;

}

let start = { x: 0, y: 0 };

outer:
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (pos(x, y) == "S") {
            start = { x, y };
            break outer;
        }
    }
}

console.log(start);

console.log(getNeighbors(start.x, start.y));