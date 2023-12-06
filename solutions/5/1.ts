import {getInput} from "../../utils/input";

type Item =
    | "seed"
    | "soil"
    | "fertilizer"
    | "water"
    | "light"
    | "temperature"
    | "humidity"
    | "location";
const itemOrder: Item[] = [
    "seed",
    "soil",
    "fertilizer",
    "water",
    "light",
    "temperature",
    "humidity",
    "location"
];

interface Map {
    from: Item;
    to: Item;
    sources: number[];
    destinations: number[];
    ranges: number[];
}
const maps: Map[] = [];

function map(value: number, from: Item, to: Item): number {
    const mapping = maps.find((map) => map.from == from && map.to == to);
    if (!mapping) {
        console.log(`no mapping found for ${from} -> ${to}`);
        return -1;
    }

    for (let i = 0; i < mapping.sources.length; i++) {
        const source = mapping.sources[i];
        const destination = mapping.destinations[i];
        const range = mapping.ranges[i];

        if (
            (value < source && value < destination) ||
            (value > source + range && value > destination + range)
        ) {
            continue;
        }

        if (value >= source && value < source + range) {
            return value - ;
        }
    }

    return value;
}

const input = getInput(5);
const mapsList = input.split("\n\n");
const seedsStr = mapsList.shift()!.split(" ");
seedsStr.shift();
const seeds: number[] = seedsStr.map((val) => parseInt(val));

for (let i = 0; i < mapsList.length; i++) {
    let mapStr = mapsList[i];
    const map: Map = {
        from: "seed",
        to: "soil",
        sources: [],
        destinations: [],
        ranges: []
    };

    const header = mapStr.split("\n")[0];

    map.from = header.split("-to-")[0] as Item;
    map.to = header.split("-to-")[1].replaceAll(" map:", "") as Item;

    const mappings = mapStr.split("\n");
    mappings.shift();

    mappings.forEach((mapping) => {
        const split = mapping.split(" ");

        map.destinations.push(parseInt(split[0]));
        map.sources.push(parseInt(split[1]));
        map.ranges.push(parseInt(split[2]));
    });

    maps.push(map);
}

const locations: number[] = [];
for (let i = 0; i < seeds.length; i++) {
    const seed = seeds[i];
    let val = seed;

    console.log("running seed", seed);
    for (let j = 0; j < itemOrder.length - 1; j++) {
        const item = itemOrder[j];
        const nextItem = itemOrder[j + 1];

        val = map(val, item, nextItem);
        console.log(item, "->", nextItem, "=", val);
    }
}

console.log(locations);
console.log("should be 81:", map(79, "seed", "soil"));
console.log("should be 14:", map(14, "seed", "soil"));
console.log("should be 47:", map(55, "seed", "soil"));
console.log("should be 13:", map(13, "seed", "soil"));
