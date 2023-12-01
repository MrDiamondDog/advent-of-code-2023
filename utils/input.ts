import fs from "fs";
import path from "path";

export function getInput(day: number): string {
    return fs.readFileSync(path.resolve(__dirname, `../inputs/${day}`), "utf-8").trim();
}
