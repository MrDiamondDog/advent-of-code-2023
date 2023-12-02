import fs from "fs";

const day = process.argv[2];

if (!day) {
    console.log("Please provide a day");
    process.exit(1);
}

const template = `import {getInput} from "../../utils/input";

const input = getInput(${day}).split("\\n");`;

fs.mkdirSync(`./solutions/${day}`);

fs.writeFileSync(`./solutions/${day}/1.ts`, template);
fs.writeFileSync(`./solutions/${day}/2.ts`, template);
