import {getInput} from "../../utils/input";

let grid = getInput(11).split("\n");

const galaxy = "#";
const empty = ".";

const expansion = 1000000;

function pos(x: number, y: number) {
    return grid[y][x];
}

function countLower(arr: number[], num: number): number {
    let count = 0;
    for (const number of arr) {
        if (number < num) count++;
    }
    return count;
}

let emptyRows: number[] = [];
let emptyCols: number[] = [];

for (let y = 0; y < grid.length; y++) {
    let isEmpty = true;
    for (let x = 0; x < grid[y].length; x++) {
        if (pos(x, y) == galaxy) {
            isEmpty = false;
            break;
        }
    }
    if (isEmpty) emptyRows.push(y);
}

for (let x = 0; x < grid[0].length; x++) {
    let isEmpty = true;
    for (let y = 0; y < grid.length; y++) {
        if (pos(x, y) == galaxy) {
            isEmpty = false;
            break;
        }
    }
    if (isEmpty) emptyCols.push(x);
}

// let i = 0;
// for (const emptyCol of emptyCols) {
//     for (let y = 0; y < grid.length; y++) {
//         grid[y] = grid[y].slice(0, emptyCol) + empty + grid[y].slice(emptyCol);
//     }
//     i++;
// }

// i = 0;
// for (const emptyRow of emptyRows) {
//     grid = [
//         ...grid.slice(0, emptyRow + i),
//         empty.repeat(grid[0].length),
//         ...grid.slice(emptyRow + i)
//     ];
//     i++;
// }

const galaxies: {x: number; y: number}[] = [];

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        if (pos(x, y) == galaxy) galaxies.push({x, y});
    }
}

console.log(galaxies.length);

let sum = 0;
const completePairs: string[] = [];
for (let i = 0; i < galaxies.length; i++) {
    for (let j = 0; j < galaxies.length; j++) {
        const galaxy = galaxies[i];
        const nextGalaxy = galaxies[j];

        if (completePairs.includes(`${j} ${i}`)) continue;
        if (galaxy == nextGalaxy) continue;

        completePairs.push(`${i} ${j}`);

        const pos = Object.assign({}, galaxy);
        let steps = 0;
        while (!(pos.x == nextGalaxy.x && pos.y == nextGalaxy.y)) {
            if (pos.x < nextGalaxy.x) {
                pos.x++;
                if (emptyCols.includes(pos.x)) steps += expansion;
                else steps++;
            }
            if (pos.x > nextGalaxy.x) {
                pos.x--;
                if (emptyCols.includes(pos.x)) steps += expansion;
                else steps++;
            }
            if (pos.y < nextGalaxy.y) {
                pos.y++;
                if (emptyRows.includes(pos.y)) steps += expansion;
                else steps++;
            }
            if (pos.y > nextGalaxy.y) {
                pos.y--;
                if (emptyRows.includes(pos.y)) steps += expansion;
                else steps++;
            }
        }

        console.log(galaxy, "-->", nextGalaxy, "in", steps, `(${completePairs.length})`);

        sum += steps;
    }
}

console.log(sum);
