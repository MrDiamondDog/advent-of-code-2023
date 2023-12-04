import { getInput } from "../../utils/input";

function isDigit(str: string) {
    return !Number.isNaN(parseInt(str));
}

const input = getInput(3);
const grid: string[] = input.split("\n");

function getNeighbors(x: number, y: number): string[] {
    let out: string[] = [];
    // top row
    // X x x
    if (y > 0 && x > 0) out.push(grid[y - 1][x - 1]);
    // x X x
    if (y > 0) out.push(grid[y - 1][x]);
    // x x X
    if (y > 0 && x < grid[y].length - 1) out.push(grid[y - 1][x + 1]);

    // right col
    if (x < grid[y].length - 1) out.push(grid[y][x + 1]);
    if (y < grid.length - 1 && x < grid[y].length - 1) out.push(grid[y + 1][x + 1]);

    // left col
    if (x > 0) out.push(grid[y][x - 1]);
    if (y < grid.length - 1 && x > 0) out.push(grid[y + 1][x - 1]);

    // bottom
    if (y < grid.length - 1) out.push(grid[y + 1][x]);

    out = out.filter(val => val != undefined);

    return out;
}

let sum = 0;
for (let y = 0; y < grid.length; y++) {
    grid[y] += ".";

    let currentNum = "";
    let hasSymbolNeighbor = false;

    for (let x = 0; x < grid[y].length; x++) {
        const char = grid[y][x];

        if (isDigit(char)) {
            currentNum += char;
            getNeighbors(x, y).forEach(val => {
                if (val != "." && !/\d/g.test(val)) {
                    hasSymbolNeighbor = true;
                }
            });
        } else if (currentNum != "") {
            if (hasSymbolNeighbor) sum += parseInt(currentNum);
            console.log(currentNum, hasSymbolNeighbor);
            currentNum = "";
            hasSymbolNeighbor = false;
        }
    }
}
console.log(sum);